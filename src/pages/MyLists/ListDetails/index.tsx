import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SessionContext } from "@/providers/session/context";
import { observeList } from "@/services/lists";
import { ArrowLeft } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { List } from "../../ViewListByCode/List";
import { ListInfo } from "../../ViewListByCode/ListInfo";

export function ListDetails() {
  const { listId } = useParams<{ listId: string }>();
  const { user } = use(SessionContext);
  const [list, setList] = useState<List | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeList({
      listId: listId!,
      callback: (data) => {
        setList(data || null);
        setIsLoading(false);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [listId]);

  const isOwner = user?.id === list?.ownerId;

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <h1 className="text-3xl font-bold">Detalhes da lista</h1>

      <Card>
        {!list && !isLoading && (
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">
                  Lista não encontrada
                </h2>
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
          </CardContent>
        )}
        <ListInfo list={list} isLoading={isLoading} isOwner={isOwner} />
      </Card>

      {list && !isLoading && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Itens da Lista</h2>
          <List list={list} />
        </div>
      )}
    </div>
  );
}
