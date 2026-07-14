import { SignUp } from "@clerk/react";
import { PageMeta } from "@/components/PageMeta";
import { basePath } from "@/lib/clerk";

export default function SignUpPage() {
  return (
    <div className="auth-page" id="page-sign-up">
      <PageMeta
        title="Create your account"
        description="Create a TWG Network account to follow your journey through the network."
      />
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}
