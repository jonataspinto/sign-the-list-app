import { SessionContext } from "@/providers/session/context";
import { use, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { isLoading, isAuthenticated } = use(SessionContext);

  const locationState = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-sm text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={`/login?redirect=${locationState.pathname}`} replace />
    );
  }

  return <>{children}</>;
}
