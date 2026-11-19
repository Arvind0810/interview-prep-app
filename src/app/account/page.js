import { redirect } from "next/navigation";
import { functionBaseUrl } from "@neon/env";
import { getUser } from "@/lib/auth/server";
import { PageHeader } from "@/components/ui";
import AccountPanels from "./AccountPanels";

export const dynamic = "force-dynamic";
export const metadata = { title: "Account — PrepHub" };

// Function URL is built on the server (browser code has no access to the branch env vars).
function progressFunctionUrl() {
  try {
    return functionBaseUrl("progress");
  } catch {
    return null;
  }
}

export default async function AccountPage() {
  const user = await getUser();
  if (!user) redirect("/auth/sign-in");
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Cloud sync" title="Account" description={`Signed in as ${user.email}`} />
      <AccountPanels functionUrl={progressFunctionUrl()} />
    </div>
  );
}
