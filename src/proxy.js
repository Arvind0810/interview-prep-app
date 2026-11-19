import { getAuth } from "@/lib/auth/server";

// Next 16 proxy (formerly middleware): sends signed-out visitors of /account to sign-in.
// Not the security boundary — every Route Handler checks the session itself.
export default function proxy(request) {
  return getAuth().middleware({ loginUrl: "/auth/sign-in" })(request);
}

export const config = {
  matcher: ["/account/:path*"],
};
