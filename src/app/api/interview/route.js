import { accessCodeRequired, checkAccess, describeError, PROVIDER_LABEL, isConfigured, missingConfigMessage, withModelFallback } from "@/lib/ai/gemini";
import { interviewerInstruction } from "@/lib/ai/prompts";
import { parseSession, toContents } from "@/lib/ai/validate";

export const dynamic = "force-dynamic";

const MAX_OUTPUT_TOKENS = 1024;
const STREAM_ERROR_MARKER = "\n[[ERROR]]";

const json = (status, body) => Response.json(body, { status });

// Lets the UI show setup instructions instead of failing on the first message.
export function GET() {
  return json(200, { configured: isConfigured(), accessCodeRequired: accessCodeRequired(), provider: PROVIDER_LABEL });
}

// Streams the interviewer's next turn as plain text.
export async function POST(request) {
  if (!isConfigured()) return json(503, { error: missingConfigMessage() });
  if (!checkAccess(request)) return json(401, { error: "Access code required." });

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "Body must be JSON." });
  }
  const session = parseSession(body);
  if (session.error) return json(400, { error: session.error });

  let upstream;
  let model;
  try {
    // Awaiting the stream here surfaces quota/auth errors before any bytes are sent,
    // so they become a proper HTTP status (and the fallback model gets its chance).
    ({ result: upstream, model } = await withModelFallback((ai, m) =>
      ai.models.generateContentStream({
        model: m,
        contents: toContents(session.messages),
        config: {
          systemInstruction: interviewerInstruction(session.config),
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          abortSignal: request.signal,
        },
      })
    ));
  } catch (err) {
    const { status, message } = describeError(err);
    return json(status, { error: message });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of upstream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch (err) {
        // Client disconnects abort the upstream call; anything else is reported in-band.
        if (!request.signal.aborted) {
          console.error("interview stream failed:", err?.message);
          controller.enqueue(encoder.encode(STREAM_ERROR_MARKER));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Model": model,
    },
  });
}
