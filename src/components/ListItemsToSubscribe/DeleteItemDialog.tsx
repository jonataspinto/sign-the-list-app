"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteItem } from "@/services/lists/items";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

export function DeleteItemDialog({
  listId,
  itemId,
}: {
  listId: string;
  itemId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function handleDeleteItem(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    startTransition(async () => {
      try {
        await deleteItem({ listId, itemId });
        setOpen(false);
      } catch (error) {
        const { trackError } = await import("@/lib/trackError");

        trackError(error);
      }
    });
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="absolute left-2 top-4 hover:bg-transparent hover:text-destructive cursor-pointer z-10"
          >
            <Trash2 className="size-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir este item?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as informações relacionadas
              a este item serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-28 max-sm:w-full">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteItem}
              className="bg-destructive text-white hover:bg-destructive/90 w-28 max-sm:w-full"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Confirmar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
