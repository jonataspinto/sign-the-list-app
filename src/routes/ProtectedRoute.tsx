import { SessionContext } from "@/providers/session/context";
import { Loader } from "lucide-react";
import { use, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { isLoading, isAuthenticated } = use(SessionContext);

  const locationState = useLocation();

  if (isLoading) {
    return <Loader className="size-10 animate-spin mx-auto mt-[10%]" />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={`/login?redirect=${locationState.pathname}`} replace />
    );
  }

  return <>{children}</>;
}
