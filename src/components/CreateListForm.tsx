import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SessionContext } from "@/providers/session/context";
import { createList } from "@/services/lists";
import { Loader2Icon } from "lucide-react";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

type CreateListFormData = {
  title: string;
  description: string;
  eventDate: string;
};

export function CreateListForm() {
  const { user } = use(SessionContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateListFormData>();

  const onSubmit = async (data: CreateListFormData) => {
    if (!user) {
      toast.error("Usuário não encontrado");
      return;
    }

    try {
      // Gerar código de compartilhamento único
      const shareCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      await createList({
        ownerId: user.id,
        title: data.title,
        description: data.description,
        eventDate: data.eventDate,
        shareCode,
      });

      toast.success("Lista criada com sucesso!");
      navigate("/my-lists");
    } catch (error) {
      console.error("Erro ao criar lista:", error);
      toast.error("Erro ao criar lista. Tente novamente.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Criar Nova Lista</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title" className="mb-2">
            Título da Lista
          </Label>
          <Input
            id="title"
            {...register("title", {
              required: "Título é obrigatório",
              minLength: {
                value: 3,
                message: "Título deve ter pelo menos 3 caracteres",
              },
            })}
            placeholder="Ex: Lista de Presentes do Aniversário"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
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
                value: 10,
                message: "Descrição deve ter pelo menos 10 caracteres",
              },
            })}
            placeholder="Descreva o evento ou ocasião..."
            rows={3}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="eventDate" className="mb-2">
            Data do Evento
          </Label>
          <Input
            id="eventDate"
            type="date"
            {...register("eventDate", {
              required: "Data do evento é obrigatória",
            })}
          />
          {errors.eventDate && (
            <p className="text-sm text-red-600 mt-1">
              {errors.eventDate.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Criar Lista"
          )}
        </Button>
      </form>
    </div>
  );
}
