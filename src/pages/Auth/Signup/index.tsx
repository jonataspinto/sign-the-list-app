import { SignupForm } from "./SignupForm";

export function SignupPage() {
  return (
    <div className="flex w-full items-center justify-center pt-6 md:pt-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
