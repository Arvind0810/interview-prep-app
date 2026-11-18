import "server-only";
import { timingSafeEqual } from "node:crypto";
import { ApiError, GoogleGenAI } from "@google/genai";

// Server-only Gemini access. The API key never reaches the browser.
// Defaults are the stable free-tier models listed on Google's models page (Nov 2026);
// override with env vars if Google renames or retires them.
export const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
export const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite";

const HTTP_TOO_MANY = 429;
const HTTP_NOT_FOUND = 404;

let client = null;

export function isConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

function getClient() {
  if (!client) client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
