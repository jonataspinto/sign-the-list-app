import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

type ItemFormData = {
  name: string;
  description: string;
  imageUrl: string;
  storeUrl: string;
};

export function ItemForm({
  onSubmit,
}: {
  listId?: string;
  onSubmit: (data: ItemFormData) => void;
}) {
  const form = useFormContext<ItemFormData>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  return (
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
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
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
          <p className="text-sm text-red-600 mt-1">{errors.imageUrl.message}</p>
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
          <p className="text-sm text-red-600 mt-1">{errors.storeUrl.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
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
  );
}
