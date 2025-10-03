import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionContext } from "@/providers/session/context";
import { getListById } from "@/services/lists";
import { ArrowLeft, Calendar, ExternalLink, Plus, Share2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export function ListDetails() {
  const { listId } = useParams<{ listId: string }>();
  const { user } = use(SessionContext);
  const [list, setList] = useState<List | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      if (!listId) return;

      try {
        setIsLoading(true);
        const listData = await getListById(listId);
        setList(listData);
      } catch (error) {
        console.error("Erro ao carregar lista:", error);
        toast.error("Erro ao carregar lista");
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [listId]);

  const copyShareCode = () => {
    if (list?.shareCode) {
      navigator.clipboard.writeText(list.shareCode);
      toast.success("Código copiado para a área de transferência!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-sm text-gray-600">Carregando lista...</div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Lista não encontrada</h2>
          <p className="text-gray-600 mb-4">
            A lista que você está procurando não existe.
          </p>
          <Button asChild>
            <Link to="/my-lists">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Minhas Listas
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === list.ownerId;
  const claimedItems = list.items.filter((item) => item.claimedBy);
  const availableItems = list.items.filter((item) => !item.claimedBy);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button variant="outline" size="sm" className="w-fit" asChild>
          <Link to="/my-lists">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{list.title}</h1>
          <p className="text-gray-600">{list.description}</p>
        </div>
      </div>

      {/* Informações da Lista */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Lista</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Data do Evento:</span>
            <span>
              {new Date(list.eventDate).toLocaleDateString("pt-BR", {
                dateStyle: "full",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Código de Compartilhamento:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
              {list.shareCode}
            </code>
            <Button variant="outline" size="sm" onClick={copyShareCode}>
              Copiar
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {claimedItems.length}
              </div>
              <div className="text-sm text-green-700">Itens Reservados</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {availableItems.length}
              </div>
              <div className="text-sm text-blue-700">Itens Disponíveis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      {isOwner && (
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`/my-lists/${list.id}/add-item`}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Item
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/lists/${list.id}/edit`}>Editar Lista</Link>
          </Button>
        </div>
      )}

      {/* Lista de Itens */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Itens da Lista</h2>

        {list.items.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Nenhum item adicionado ainda.
              </p>
              {isOwner && (
                <Button asChild>
                  <Link to={`/my-lists/${list.id}/add-item`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeiro Item
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {/* Itens Disponíveis */}
            {availableItems.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3 text-green-700">
                  Disponíveis ({availableItems.length})
                </h3>
                <div className="grid gap-3">
                  {availableItems.map((item, index) => (
                    <Card key={index} className="border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {item.description}
                              </p>
                            )}
                            {item.storeUrl && (
                              <a
                                href={item.storeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Ver na loja
                              </a>
                            )}
                          </div>
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded ml-4"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Itens Reservados */}
            {claimedItems.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3 text-orange-700">
                  Reservados ({claimedItems.length})
                </h3>
                <div className="grid gap-3">
                  {claimedItems.map((item, index) => (
                    <Card
                      key={index}
                      className="border-orange-200 bg-orange-50"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium line-through text-gray-600">
                              {item.name}
                            </h4>
                            {item.description && (
                              <p className="text-sm text-gray-500 mt-1 line-through">
                                {item.description}
                              </p>
                            )}
                            <p className="text-sm text-orange-700 mt-2">
                              Reservado por: {item.claimedBy}
                            </p>
                            <p className="text-xs text-gray-500">
                              Em:{" "}
                              {new Date(item.claimedAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </div>
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded ml-4 opacity-50"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
