import { CreateListForm } from "@/components/CreateListForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CreateListPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-6">
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <CreateListForm />
    </div>
  );
}
