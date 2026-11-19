import "server-only";
import { createNeonAuth } from "@neon/auth/next/server";

// Lazy: createNeonAuth validates the cookie secret when constructed and throws without it,
// and `next build` imports modules without runtime env.
let auth;

export function getAuth() {
  if (!auth) {
    auth = createNeonAuth({
      baseUrl: process.env.NEON_AUTH_BASE_URL,
      cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET },
    });
  }
  return auth;
}

// The signed-in user, or null. Call it first in every Route Handler, Server Action and
// Server Component data path: proxy.js redirects pages but is not the security boundary.
export async function getUser() {
  const { data, error } = await getAuth().getSession();
  if (error) console.warn("[auth] getSession failed:", error.code || error.message);
  return data?.user ?? null;
}

export const unauthorized = () =>
  Response.json({ error: "Sign in required." }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
