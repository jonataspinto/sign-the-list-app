import { SessionContext } from "@/providers/session/context";
import { getListsByOwner } from "@/services/lists";
import { use, useEffect, useState } from "react";
import { MyListItem, MyListItemSkeleton } from "./MyListItem";

export function MyLists() {
  const [lists, setLists] = useState<ListCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = use(SessionContext);

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const response = await getListsByOwner(user?.id);
          setLists(response);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [user]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Minhas listas
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {isLoading && <MyListItemSkeleton />}

        {!isLoading &&
          lists?.map((list) => <MyListItem key={list.id} list={list} />)}
      </div>
    </div>
  );
}
