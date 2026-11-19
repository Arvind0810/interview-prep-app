import { getUser, unauthorized } from "@/lib/auth/server";
import { parseEntries, readProgress, writeProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store" };

// The signed-in user's synced progress rows.
export async function GET() {
  const user = await getUser();
  if (!user) return unauthorized();
  try {
    return Response.json({ rows: await readProgress(user.id) }, { headers: NO_STORE });
  } catch (err) {
    console.error("[progress] read failed:", err.message);
    return Response.json({ error: "Could not read progress." }, { status: 500, headers: NO_STORE });
  }
}

// Upserts { entries: [{ key, value }] } for the signed-in user. user_id never comes from the body.
export async function PUT(request) {
  const user = await getUser();
  if (!user) return unauthorized();

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON." }, { status: 400, headers: NO_STORE });
  }
  const parsed = parseEntries(body);
  if (parsed.error) return Response.json({ error: parsed.error }, { status: 400, headers: NO_STORE });

  try {
    const txid = await writeProgress(user.id, parsed.entries);
    return Response.json({ kind: "committed", txid, count: parsed.entries.length }, { headers: NO_STORE });
  } catch (err) {
    console.error("[progress] write failed:", err.message);
    return Response.json({ error: "Could not save progress." }, { status: 500, headers: NO_STORE });
  }
}
