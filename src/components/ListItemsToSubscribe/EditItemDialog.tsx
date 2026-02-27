"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ItemFormFields,
  type ItemFormData,
} from "@/pages/MyLists/AddItemPage/ItemFormFields";

import { Edit, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function EditItemDialog({
  item,
  listId,
}: {
  listId: string;
  item: Item;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<ItemFormData>({
    values: {
      ...item,
    },
  });

  async function onSubmit(formData: ItemFormData) {
    startTransition(async () => {
      const { updateItem } = await import("@/services/lists/items");
      const { productScraper } = await import("@/services/productScrapper");
      const { toast } = await import("sonner");

      if (
        (!!formData.storeUrl && (!formData.name || !formData.imageUrl)) ||
        formData.storeUrl !== item.storeUrl
      ) {
        const data = await productScraper(formData.storeUrl).catch(
          async (error) => {
            const { trackError } = await import("@/lib/trackError");

            trackError(error);
            toast.error(
              "Erro ao buscar informações do produto. Verifique a URL e tente novamente.",
            );
            return null;
          },
        );

        if (data) {
          if (!!data.pageUrl && data.pageUrl) {
            const { mountStoreUrl } = await import("@/lib/mountStoreUrl");
            formData.storeUrl = mountStoreUrl(data.pageUrl);
          }
          formData.name = data.productTitle;
          formData.imageUrl = data.imageUrl;
        }
      }

      try {
        await updateItem({ listId, itemId: item.id!, itemData: formData });
        setOpen(false);
        form.reset();
        toast.success("Informações do produto atualizadas com sucesso!");
      } catch (error) {
        const { trackError } = await import("@/lib/trackError");

        trackError(error);

        toast.error(
          "Erro ao atualizar informações do produto. Tente novamente.",
        );
      }
    });
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-4 hover:bg-transparent hover:text-destructive cursor-pointer z-10"
          >
            <Edit className="size-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-sm:w-full">
          <AlertDialogHeader className="items-start">
            <AlertDialogTitle>Editar Item - {item.name}</AlertDialogTitle>
            <AlertDialogDescription className="text-start">
              Faça as alterações necessárias e clique em "Confirmar" para
              salvar.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <ItemFormFields />

              <AlertDialogFooter className="">
                <AlertDialogCancel className="w-28 max-sm:w-full">
                  Cancelar
                </AlertDialogCancel>
                <Button className="bg-destructive text-white hover:bg-destructive/90 w-28 max-sm:w-full">
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </FormProvider>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
