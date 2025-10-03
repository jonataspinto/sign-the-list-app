import { LoginForm } from "@/components/login-form";
import { SessionContext } from "@/providers/session/context";
import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = use(SessionContext);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/profile", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-sm text-gray-600">Verificando sessão...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Será redirecionado pelo useEffect
  }

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
