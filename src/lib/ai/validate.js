import "server-only";
import { QUESTION_COUNTS, ROUNDS, TONES, TOPICS } from "@/lib/ai/prompts";
import { COMPANIES } from "@/data/companies";

export const MAX_MESSAGES = 60;
export const MAX_CHARS_PER_MESSAGE = 4000;
const GENERAL = "general";
const ROLES = new Set(["interviewer", "candidate"]);

// Rejects anything outside the shapes the UI sends, so a hand-crafted request can't
// smuggle a huge or unexpected payload to the model.
export function parseSession(body) {
  if (!body || typeof body !== "object") return { error: "Invalid body" };
  const { config, messages } = body;
  if (!config || typeof config !== "object") return { error: "Missing config" };

  const company = config.company === GENERAL || COMPANIES.some((c) => c.slug === config.company) ? config.company : null;
  if (!company) return { error: "Unknown company" };
  if (!ROUNDS[config.round]) return { error: "Unknown round" };
  if (!TONES[config.tone]) return { error: "Unknown tone" };
  if (!QUESTION_COUNTS.includes(config.questions)) return { error: "Invalid question count" };

  if (!Array.isArray(messages) || messages.length > MAX_MESSAGES) return { error: "Too many messages" };
  for (const m of messages) {
    if (!m || !ROLES.has(m.role) || typeof m.text !== "string") return { error: "Invalid message" };
    if (m.text.length > MAX_CHARS_PER_MESSAGE) return { error: `Messages are limited to ${MAX_CHARS_PER_MESSAGE} characters` };
  }
  return {
    config: { company, round: config.round, tone: config.tone, questions: config.questions },
    messages: messages.map((m) => ({ role: m.role, text: m.text })),
  };
}

const clampScore = (n) => Math.min(4, Math.max(1, Math.round(Number(n) || 1)));
const strings = (arr) => (Array.isArray(arr) ? arr.filter((s) => typeof s === "string" && s.trim()) : []);

// The schema constrains the model, but the client still gets a normalised, defensive copy.
export function normaliseGrade(raw) {
  const answers = (Array.isArray(raw?.answers) ? raw.answers : []).map((a) => ({
    question: String(a?.question || "").slice(0, 500),
    topic: TOPICS.includes(a?.topic) ? a.topic : "Behavioral",
    evidence: String(a?.evidence || ""),
    scores: {
      structure: clampScore(a?.scores?.structure),
      depth: clampScore(a?.scores?.depth),
      ownership: clampScore(a?.scores?.ownership),
      concise: clampScore(a?.scores?.concise),
    },
  }));
  return {
    overall: { verdict: String(raw?.overall?.verdict || "Lean no hire"), summary: String(raw?.overall?.summary || "") },
    answers,
    strengths: strings(raw?.strengths),
    gaps: strings(raw?.gaps),
    overclaims: strings(raw?.overclaims),
    improvedAnswers: (Array.isArray(raw?.improvedAnswers) ? raw.improvedAnswers : [])
      .filter((x) => x?.question && x?.betterAnswer)
      .map((x) => ({ question: String(x.question), betterAnswer: String(x.betterAnswer) })),
  };
}

// Gemini roles: "user" for the candidate, "model" for the interviewer. The opening
// user turn starts the call so the conversation always begins with a user message.
export function toContents(messages) {
  return [
    { role: "user", parts: [{ text: "(The candidate has joined the call. Begin the interview.)" }] },
    ...messages.map((m) => ({ role: m.role === "interviewer" ? "model" : "user", parts: [{ text: m.text }] })),
  ];
}
