import { getUser, unauthorized } from "@/lib/auth/server";
import { sealProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store" };

// Seals (and renews) the live query for the user in the session. A Route Handler, not a
// Server Action, because Next runs actions one at a time and renewal must not queue.
// The client sends the user id its page was loaded for; a different session user is a 401,
// so a stale tab can't keep streaming after someone else signs in.
// Without a userId it is the page-load probe: signed-out visitors get 200 { signedIn: false }
// (the normal case, not an error). With a userId it is a renewal, where no/another user is a 401.
export async function POST(request) {
  let expectedUserId;
  try {
    expectedUserId = (await request.json())?.userId;
  } catch {
    expectedUserId = undefined;
  }

  const user = await getUser();
  if (!user) return expectedUserId ? unauthorized() : Response.json({ signedIn: false }, { headers: NO_STORE });
  if (expectedUserId && expectedUserId !== user.id) return unauthorized();

  try {
    const sealed = await sealProgress(user.id);
    return Response.json(
      { userId: user.id, email: user.email, realtimeUrl: process.env.NEON_REALTIME_URL, sealed },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("[progress] seal failed:", err.message);
    return Response.json({ error: "Live sync unavailable." }, { status: 503, headers: NO_STORE });
  }
}
