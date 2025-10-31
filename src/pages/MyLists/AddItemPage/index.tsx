import { ConditionalRender } from "@/components/ConditionalRender";
import { Button } from "@/components/ui/button";
import { addItemToList } from "@/services/lists/items";
import { ArrowLeft } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ItemFormActions, ItemFormFields } from "./ItemForm";
import { ItemPreview } from "./ItemPreview";
import { useAddItemPage, type AddItemFormData } from "./useAddItemPage";

export function AddItemPage() {
  const navigate = useNavigate();
  const { list, isLoading, form, listId } = useAddItemPage();

  const onSubmit = async ({ repeat, ...data }: AddItemFormData) => {
    if (!listId) return;

    try {
      if (repeat && repeat > 1) {
        for (let i = 0; i < repeat; i++) {
          await addItemToList(listId, data);
        }
      } else {
        await addItemToList(listId, data);
      }
      toast.success("Item adicionado com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      toast.error("Erro ao adicionar item. Tente novamente.");
    }
  };

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

      <ConditionalRender condition={isLoading}>
        <div className="flex items-center justify-center p-6">
          <div className="text-sm text-gray-600">Carregando lista...</div>
        </div>
      </ConditionalRender>

      <ConditionalRender condition={!isLoading && !list}>
        <div className="flex flex-col items-center justify-center min-h-52">
          <h1 className="text-xl font-semibold mb-2">Lista não encontrada</h1>
          <p className="text-gray-600 mb-4">
            A lista que você está procurando não existe.
          </p>
        </div>
      </ConditionalRender>

      <ConditionalRender condition={!isLoading && !!list}>
        <div>
          <h1 className="text-3xl font-bold">Adicionar Item</h1>
          <p className="text-gray-600">
            Adicione um novo item à lista: {list?.title}
          </p>
        </div>

        <FormProvider {...form}>
          <div className="flex flex-col space-y-6 w-full md:grid md:grid-cols-2 md:gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <ItemFormFields showRepeatField />
              <ItemFormActions />
            </form>

            <ItemPreview />
          </div>
        </FormProvider>
      </ConditionalRender>
    </div>
  );
}
