"use server";
import { getAuth } from "@/lib/auth/server";

const MIN_PASSWORD_LENGTH = 8;
const field = (formData, name) => String(formData.get(name) || "").trim();

// On success the form does a full page load (not a client redirect), so CloudSync and the
// Realtime client start fresh for the new session.
export async function signUpWithEmail(_prev, formData) {
  const email = field(formData, "email");
  const name = field(formData, "name") || email.split("@")[0];
  const password = String(formData.get("password") || "");
  if (!email) return { error: "Email is required." };
  if (password.length < MIN_PASSWORD_LENGTH) return { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` };

  const { error } = await getAuth().signUp.email({ email, name, password });
  if (error) return { error: error.message || "Could not create the account." };
  return { ok: true };
}

export async function signInWithEmail(_prev, formData) {
  const { error } = await getAuth().signIn.email({
    email: field(formData, "email"),
    password: String(formData.get("password") || ""),
  });
  if (error) return { error: error.message || "Could not sign in. Try again." };
  return { ok: true };
}
