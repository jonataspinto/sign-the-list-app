import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SessionContext } from "@/providers/session/context";
import { observeListsByOwner } from "@/services/lists";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyListItem, MyListItemSkeleton } from "./MyListItem";

export function MyLists() {
  const [lists, setLists] = useState<ListCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Minhas listas
      </h1>

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
