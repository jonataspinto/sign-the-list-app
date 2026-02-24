import { ConditionalRender } from "@/components/ConditionalRender";
import { LoaderPortal } from "@/components/LoaderPortal";
import { Overlay } from "@/components/Overlay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";

export type ItemFormData = {
  name: string;
  description: string;
  imageUrl: string;
  storeUrl: string;
  repeat?: number;
};

export function ItemFormFields({
  showRepeatField = false,
  scrapeProductInfoOnStoreUrlBlur = false,
}: {
  showRepeatField?: boolean;
  scrapeProductInfoOnStoreUrlBlur?: boolean;
}) {
  const form = useFormContext<ItemFormData>();
  const [isPending, startTransition] = useTransition();

  async function handleStoreUrlBlur() {
    if (!scrapeProductInfoOnStoreUrlBlur) return;

    const storeUrl = form.getValues().storeUrl;

    startTransition(async () => {
      const { productScraper } = await import("@/services/productScrapper");

      const data = await productScraper(storeUrl);

      if (data) {
        const { toast } = await import("sonner");

        toast.success("Informações do produto preenchidas com sucesso!");

        form.setValue("name", data.productTitle, { shouldDirty: true });
        form.setValue("imageUrl", data.imageUrl, { shouldDirty: true });
      }
    });
  }

  return (
    <>
      <ConditionalRender
        condition={scrapeProductInfoOnStoreUrlBlur && isPending}
      >
        <LoaderPortal>
          <Overlay className="backdrop-blur-[2px]">
            <Loader className="size-10 animate-spin mx-auto mt-[10%]" />
          </Overlay>
        </LoaderPortal>
      </ConditionalRender>

      <div>
        <Label htmlFor="name" className="mb-2">
          Nome do Item
        </Label>
        <Input
          id="name"
          {...form.register("name", {
            required: "Nome é obrigatório",
            minLength: {
              value: 2,
              message: "Nome deve ter pelo menos 2 caracteres",
            },
          })}
          placeholder="Ex: Camiseta azul"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="description" className="mb-2">
          Descrição
        </Label>
        <Textarea
          id="description"
          {...form.register("description", {
            required: "Descrição é obrigatória",
            minLength: {
              value: 5,
              message: "Descrição deve ter pelo menos 5 caracteres",
            },
          })}
          placeholder="Descreva o item..."
          rows={3}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.description.message}
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
          {...form.register("imageUrl", {
            pattern: {
              value: /^https?:\/\/.+/,
              message: "URL deve começar com http:// ou https://",
            },
          })}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {form.formState.errors.imageUrl && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.imageUrl.message}
          </p>
        )}
      </div>

      <div className={cn(scrapeProductInfoOnStoreUrlBlur && "order-first")}>
        <Label htmlFor="storeUrl" className="mb-2">
          URL da Loja (opcional)
        </Label>
        <p className="text-xs text-muted-foreground mb-2">
          As informações serão preenchidas automaticamente ao informar uma URL
          válida. <strong>Lojas com integração: Mercado Livre, Amazon</strong>
        </p>
        <Input
          id="storeUrl"
          type="url"
          {...form.register("storeUrl", {
            pattern: {
              value: /^https?:\/\/.+/,
              message: "URL deve começar com http:// ou https://",
            },
          })}
          onBlur={handleStoreUrlBlur}
          placeholder="https://loja.com/produto"
        />
        {form.formState.errors.storeUrl && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.storeUrl.message}
          </p>
        )}
      </div>

      <ConditionalRender condition={showRepeatField}>
        <div className="mb-4">
          <Label
            htmlFor="repeat"
            className="block text-sm font-medium text-gray-700"
          >
            Repetir item
          </Label>
          <Input
            id="repeat"
            type="number"
            min={1}
            defaultValue={1}
            {...form.register("repeat")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Quantas vezes criar este item?"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Exemplo: para criar 3 pacotes de fralda, coloque 3. O valor padrão é{" "}
            <strong>1</strong>, ou seja, será criado apenas um item se não
            alterar.
          </p>
          {form.formState.errors.repeat && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.repeat.message}
            </p>
          )}
        </div>
      </ConditionalRender>
    </>
  );
}
