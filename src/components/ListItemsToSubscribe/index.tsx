import { Card, CardContent } from "@/components/ui/card";
import { observeListItems } from "@/services/lists/items";
import { useEffect, useState } from "react";
import { Item } from "./Item";

export function ListItemsToSubscribe({
  list,
  emptyStateMessage,
}: {
  list: List;
  emptyStateMessage?: React.ReactNode;
}) {
  const [items, setItems] = useState<Record<string, Item>>({});
  const isEmpty = Object.values(items)?.length === 0;
  const claimedItems =
    Object.values(items ?? {}).filter((item) => item.claimedBy) || [];
  const availableItems =
    Object.values(items ?? {}).filter((item) => !item.claimedBy) || [];
  const listId = list.id;

  useEffect(() => {
    const unsubscribe = observeListItems(
      {
        listId,
      },
      (data) => {
        setItems(data);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [listId]);

  if (isEmpty) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          {emptyStateMessage || (
            <p className="text-gray-600">Esta lista ainda não possui itens.</p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="animate-in fade-in duration-700">
        <CardContent>
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-1000">
        {Object.values(items)?.map((item) => (
          <Item
            key={item.id}
            item={item}
            listId={listId}
            ownerId={list.ownerId}
          />
        ))}
      </div>
    </>
  );
}
