import { SignIn } from "@clerk/react";
import { PageMeta } from "@/components/PageMeta";
import { basePath } from "@/lib/clerk";

export default function SignInPage() {
  return (
    <div className="auth-page" id="page-sign-in">
      <PageMeta
        title="Sign in"
        description="Sign in to your TWG Network account to follow your journey through the network."
      />
      {/* path must be the full browser path — Clerk reads window.location.pathname directly */}
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}
