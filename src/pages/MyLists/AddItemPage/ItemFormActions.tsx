import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function ItemFormActions() {
  const form = useFormContext();

  return (
    <div className="flex gap-2">
      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="flex-1"
      >
        <Plus className="w-4 h-4 mr-2" />
        {form.formState.isSubmitting ? "Adicionando..." : "Adicionar Item"}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => form.reset()}
        disabled={form.formState.isSubmitting}
      >
        Limpar
      </Button>
    </div>
  );
}
