import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SessionContext } from "@/providers/session/context";
import { observeListsByOwner } from "@/services/lists";
import { ArrowLeft } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyListItem, MyListItemSkeleton } from "./MyListItem";

export function MyLists() {
  const [lists, setLists] = useState<ListCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = use(SessionContext);

  const isEmpty = !isLoading && (!lists || lists.length === 0);

  useEffect(() => {
    const unsubscribe = observeListsByOwner(user?.id, (data) => {
      setLists(data);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="flex flex-col space-y-6">
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <h1 className="text-3xl font-bold">Minhas listas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <MyListItemSkeleton />}

        {!isLoading &&
          lists?.map((list) => <MyListItem key={list.id} list={list} />)}

        {isEmpty && (
          <Card className="col-span-3">
            <CardContent className="text-center py-8">
              <p className="text-gray-600">
                Esta lista ainda não possui itens.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/create-list">Crie sua primeira lista</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
