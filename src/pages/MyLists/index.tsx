import { SessionContext } from "@/providers/session/context";
import { observeListsByOwner } from "@/services/lists";
import { use, useEffect, useState } from "react";
import { MyListItem, MyListItemSkeleton } from "./MyListItem";

export function MyLists() {
  const [lists, setLists] = useState<ListCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = use(SessionContext);

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

      <div className="grid grid-cols-3 gap-4">
        {isLoading && <MyListItemSkeleton />}

        {!isLoading &&
          lists?.map((list) => <MyListItem key={list.id} list={list} />)}
      </div>
    </div>
  );
}
