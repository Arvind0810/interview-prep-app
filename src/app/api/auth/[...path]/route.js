import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

// Proxies every Managed Better Auth call to the branch's Neon Auth URL. Resolved per request
// so the cookie secret is only required at runtime, not during `next build`.
const forward = (method) => (request, ctx) => getAuth().handler()[method](request, ctx);

export const GET = forward("GET");
export const POST = forward("POST");
export const PUT = forward("PUT");
export const PATCH = forward("PATCH");
export const DELETE = forward("DELETE");
