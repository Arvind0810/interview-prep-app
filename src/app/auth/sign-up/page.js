import AuthForm from "../AuthForm";
import { signUpWithEmail } from "../actions";

export const metadata = { title: "Create account — PrepHub" };

export default function SignUpPage() {
  return <AuthForm mode="sign-up" action={signUpWithEmail} />;
}
