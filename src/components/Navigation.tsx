import { SessionContext } from "@/providers/session/context";
import { use } from "react";
import { Link } from "react-router-dom";

export function Navigation() {
  const { user, isAuthenticated } = use(SessionContext);

  return (
    <nav className="flex items-center gap-4 text-sm">
      <div className="flex gap-3">
        <Link className="underline text-blue-600" to="/">
          Home
        </Link>
        <Link className="underline text-blue-600" to="/view-list">
          Ver Lista
        </Link>
        {!isAuthenticated ? (
          <Link className="underline text-blue-600" to="/login">
            Login
          </Link>
        ) : (
          <>
            <Link className="underline text-blue-600" to="/create-list">
              Criar Lista
            </Link>
            <Link className="underline text-blue-600" to="/my-lists">
              Minhas Listas
            </Link>
            <Link className="underline text-blue-600" to="/profile">
              Perfil
            </Link>
            {user && <span className="text-gray-600">Olá, {user.name}</span>}
          </>
        )}
      </div>
    </nav>
  );
}
