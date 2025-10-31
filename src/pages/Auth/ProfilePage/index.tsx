import { AvatarLink } from "@/components/AvatarLink";
import { SessionContext } from "@/providers/session/context";
import { logout } from "@/services/firebase";
import { use } from "react";

export function ProfilePage() {
  const { user, isLoading } = use(SessionContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-sm text-gray-600">Carregando perfil...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-sm text-gray-600">Usuário não encontrado</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <div className="flex items-center gap-4">
        <AvatarLink />
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="text-xs text-gray-500">Plano: {user.plan}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-medium">ID:</span> {user.id}
        </div>
        <div className="text-sm">
          <span className="font-medium">Criado em:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </div>
      <div>
        <button
          className="px-3 py-2 rounded bg-gray-800 text-white"
          onClick={() => logout()}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
