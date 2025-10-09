import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getListById } from "@/services/lists";
import { addItemToList } from "@/services/lists/items";
import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ItemPreview } from "./ItemPreview";

export type AddItemFormData = {
  name: string;
  description: string;
  imageUrl: string;
  storeUrl: string;
};

export function AddItemForm() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const [list, setList] = useState<List | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<AddItemFormData>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

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
        navigate("/my-lists");
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [listId, navigate]);

  const onSubmit = async (data: AddItemFormData) => {
    if (!listId) return;

    try {
      await addItemToList(listId, data);
      toast.success("Item adicionado com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      toast.error("Erro ao adicionar item. Tente novamente.");
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

  return (
    <FormProvider {...form}>
      <div className="flex flex-col space-y-6 w-full md:grid md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col w-full gap-4">
            <Button variant="outline" size="sm" className="w-fit" asChild>
              <Link to={`/my-lists/${listId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Adicionar Item</h1>
              <p className="text-gray-600">
                Adicione um novo item à lista: {list.title}
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name" className="mb-2">
                  Nome do Item
                </Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Nome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "Nome deve ter pelo menos 2 caracteres",
                    },
                  })}
                  placeholder="Ex: Camiseta azul"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="mb-2">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Descrição é obrigatória",
                    minLength: {
                      value: 5,
                      message: "Descrição deve ter pelo menos 5 caracteres",
                    },
                  })}
                  placeholder="Descreva o item..."
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="imageUrl" className="mb-2">
                  URL da Imagem (opcional)
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  {...register("imageUrl", {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "URL deve começar com http:// ou https://",
                    },
                  })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {errors.imageUrl && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="storeUrl" className="mb-2">
                  URL da Loja (opcional)
                </Label>
                <Input
                  id="storeUrl"
                  type="url"
                  {...register("storeUrl", {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "URL deve começar com http:// ou https://",
                    },
                  })}
                  placeholder="https://loja.com/produto"
                />
                {errors.storeUrl && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.storeUrl.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Adicionando..." : "Adicionar Item"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                >
                  Limpar
                </Button>
              </div>
            </form>
          </div>
        </div>

        <ItemPreview />
      </div>
    </FormProvider>
  );
}
