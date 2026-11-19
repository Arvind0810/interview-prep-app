import "server-only";
import { timingSafeEqual } from "node:crypto";
import { ApiError, GoogleGenAI } from "@google/genai";

// Server-only Gemini access. Credentials never reach the browser.
// Two providers share the same @google/genai code path:
//  - "google" (default): Google AI Studio with GEMINI_API_KEY.
//  - "neon": the Neon AI Gateway's native Gemini endpoint (AI_PROVIDER=neon). It needs
//    NEON_AI_GATEWAY_BASE_URL/TOKEN (written by `neon deploy`) and AI Gateway credits.
// Model IDs differ per provider (Google: "gemini-3.8-flash", Neon catalog: "gemini-3-8-flash");
// override with env vars if either provider renames or retires them.
const USE_NEON = process.env.AI_PROVIDER === "neon";
export const PROVIDER_LABEL = USE_NEON ? "Neon AI Gateway" : "Gemini";

export const PRIMARY_MODEL = USE_NEON
  ? process.env.NEON_AI_MODEL || "gemini-3-8-flash"
  : process.env.GEMINI_MODEL || "gemini-3.8-flash";
export const FALLBACK_MODEL = USE_NEON
  ? process.env.NEON_AI_FALLBACK_MODEL || "gemini-3-5-flash-lite"
  : process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite";

const HTTP_TOO_MANY = 429;
const HTTP_NOT_FOUND = 404;
const HTTP_FORBIDDEN = 403;

let client = null;

export function isConfigured() {
  if (USE_NEON) return Boolean(process.env.NEON_AI_GATEWAY_BASE_URL && process.env.NEON_AI_GATEWAY_TOKEN);
  return Boolean(process.env.GEMINI_API_KEY);
}

export function missingConfigMessage() {
  return USE_NEON
    ? "NEON_AI_GATEWAY_BASE_URL / NEON_AI_GATEWAY_TOKEN are not set on the server. Run `neon env pull`."
    : "GEMINI_API_KEY is not set on the server.";
}

// The gateway wants `Authorization: Bearer` (the SDK's apiKey becomes x-goog-api-key, which it
// ignores, but the SDK requires a non-empty value) and serves the Gemini API at v1beta.
function createNeonClient() {
  return new GoogleGenAI({
    apiKey: "neon-ai-gateway",
    httpOptions: {
      apiVersion: "v1beta",
      baseUrl: `${process.env.NEON_AI_GATEWAY_BASE_URL}/gemini`,
      headers: { Authorization: `Bearer ${process.env.NEON_AI_GATEWAY_TOKEN}` },
    },
  });
}

function getClient() {
  if (!client) client = USE_NEON ? createNeonClient() : new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

// Optional shared secret so a deployed copy can't be used to burn your free quota.
export function accessCodeRequired() {
  return Boolean(process.env.AI_ACCESS_CODE);
}

export function checkAccess(request) {
  const expected = process.env.AI_ACCESS_CODE;
  if (!expected) return true;
  const given = request.headers.get("x-access-code") || "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Free-tier quota is per model, so a 429 on the primary model is retried once on the
// fallback model. A 404 means the model ID was retired — also worth one retry.
export async function withModelFallback(call) {
  try {
    return { result: await call(getClient(), PRIMARY_MODEL), model: PRIMARY_MODEL };
  } catch (err) {
    const retryable = err instanceof ApiError && (err.status === HTTP_TOO_MANY || err.status === HTTP_NOT_FOUND);
    if (!retryable || FALLBACK_MODEL === PRIMARY_MODEL) throw err;
    return { result: await call(getClient(), FALLBACK_MODEL), model: FALLBACK_MODEL };
  }
}

// Maps SDK / network errors to a status and a message safe to show the user.
export function describeError(err) {
  if (USE_NEON && err instanceof ApiError) {
    if (err.status === HTTP_FORBIDDEN && /paid_plan_required|credit/i.test(err.message || "")) {
      return { status: 402, message: "Neon AI Gateway has no credits yet. Add a card and buy AI Gateway credits on the Neon Billing page." };
    }
    if (err.status === 401 || err.status === HTTP_FORBIDDEN) {
      return { status: 502, message: "Neon AI Gateway rejected the credential. Run `neon env pull` to refresh it." };
    }
    if (err.status === HTTP_TOO_MANY) return { status: HTTP_TOO_MANY, message: "Neon AI Gateway rate limit reached. Wait a moment and retry." };
    return { status: 502, message: `Neon AI Gateway error (${err.status}). Try again shortly.` };
  }
  if (err instanceof ApiError) {
    if (err.status === HTTP_TOO_MANY) {
      return { status: HTTP_TOO_MANY, message: "Gemini free-tier quota reached. Wait a minute and retry. If it persists, the daily limit is used up." };
    }
    // Google reports a bad key as 400 INVALID_ARGUMENT, so check the message before the generic 400.
    const badKey = err.status === 401 || err.status === 403 || /api key/i.test(err.message || "");
    if (err.status === 400 && !badKey) return { status: 400, message: "Gemini rejected the request. Try a shorter answer, or start a new session." };
    if (badKey) return { status: 502, message: "Gemini API key was rejected. Check GEMINI_API_KEY and its API restrictions." };
    return { status: 502, message: `Gemini error (${err.status}). Try again shortly.` };
  }
  return { status: 502, message: "Could not reach Gemini. Check your connection and try again." };
}
