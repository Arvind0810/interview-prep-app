import { checkAccess, describeError, isConfigured, withModelFallback } from "@/lib/ai/gemini";
import { GRADE_SCHEMA, GRADER_INSTRUCTION } from "@/lib/ai/prompts";
import { roundLabel } from "@/data/aiOptions";
import { normaliseGrade, parseSession } from "@/lib/ai/validate";

export const dynamic = "force-dynamic";

const MAX_OUTPUT_TOKENS = 8192;
const MIN_CANDIDATE_TURNS = 1;

const json = (status, body) => Response.json(body, { status });

function transcriptText(config, messages) {
  const lines = messages.map((m) => `${m.role === "interviewer" ? "INTERVIEWER" : "CANDIDATE"}: ${m.text}`);
  return `Round: ${roundLabel(config.round)}. Company: ${config.company}.\n\nTRANSCRIPT\n${lines.join("\n\n")}`;
}

// Grades a finished transcript and returns JSON that matches GRADE_SCHEMA.
export async function POST(request) {
  if (!isConfigured()) return json(503, { error: "GEMINI_API_KEY is not set on the server." });
  if (!checkAccess(request)) return json(401, { error: "Access code required." });

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "Body must be JSON." });
  }
  const session = parseSession(body);
  if (session.error) return json(400, { error: session.error });
  if (session.messages.filter((m) => m.role === "candidate").length < MIN_CANDIDATE_TURNS) {
    return json(400, { error: "Answer at least one question before grading." });
  }

  try {
    const { result, model } = await withModelFallback((ai, m) =>
      ai.models.generateContent({
        model: m,
        contents: [{ role: "user", parts: [{ text: transcriptText(session.config, session.messages) }] }],
        config: {
          systemInstruction: GRADER_INSTRUCTION,
          responseMimeType: "application/json",
          responseJsonSchema: GRADE_SCHEMA,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          abortSignal: request.signal,
        },
      })
    );

    let parsed;
    try {
      parsed = JSON.parse(result.text || "");
    } catch {
      return json(502, { error: "Gemini returned an incomplete grade. Try grading again." });
    }
    return json(200, { grade: normaliseGrade(parsed), model });
  } catch (err) {
    const { status, message } = describeError(err);
    return json(status, { error: message });
  }
}
