import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getListByShareCode } from "@/services/lists";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import { List } from "./List";
import { ListInfo } from "./ListInfo";

const formSchema = z.object({
  shareCode: z
    .string({
      error: "Código é obrigatório",
    })
    .min(6, { message: "Código deve ter 6 caracteres" })
    .max(6, { message: "Código deve ter 6 caracteres" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Código deve conter apenas letras e números",
    }),
});

export function ViewListByCode() {
  const [list, setList] = useState<List | null>(null);
  const [searchParams] = useSearchParams();

  const code = searchParams.get("shareCode") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: { shareCode: code.toUpperCase() },
  });

  const shareCode = watch("shareCode");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const listData = await getListByShareCode(data.shareCode.toUpperCase());

      setList({ ...listData });
    } catch (error) {
      console.error("Erro ao buscar lista:", error);
      setList(null);
      toast.error("Lista não encontrada com este código");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Visualizar Lista</h1>
        <p className="text-gray-600">
          Digite o código de compartilhamento para visualizar uma lista
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Label htmlFor="shareCode">Código de Compartilhamento</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Input
                id="shareCode"
                {...register("shareCode")}
                placeholder="Ex: ABC123"
                className="uppercase  sm:col-span-3"
                maxLength={6}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Buscar lista
                  </>
                )}
              </Button>
            </div>
            {errors.shareCode && (
              <p className="text-sm text-red-600 mt-1">
                {errors.shareCode.message}
              </p>
            )}
          </form>
        </CardContent>

        {<ListInfo list={list} isLoading={isSubmitting} />}

        {/* No result */}
        {!!shareCode && !isSubmitting && isSubmitted && !list && (
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Lista não encontrada</h3>
            <p className="text-gray-600 mb-4">
              Nenhuma lista foi encontrada com o código "{shareCode}".
            </p>
            <p className="text-sm text-gray-500">
              Verifique se o código está correto e tente novamente.
            </p>
          </CardContent>
        )}
      </Card>

      <>
        {!isSubmitting && list && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Itens da Lista</h2>
            <List listId={list.id}></List>
          </div>
        )}
      </>
    </div>
  );
}
