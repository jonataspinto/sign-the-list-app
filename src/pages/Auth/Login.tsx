import { LoginForm } from "@/pages/Auth/LoginForm";
import { SessionContext } from "@/providers/session/context";
import { use, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = use(SessionContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/profile";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate, redirectPath]);

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
    <div className="flex w-full items-center justify-center pt-6 md:pt-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
