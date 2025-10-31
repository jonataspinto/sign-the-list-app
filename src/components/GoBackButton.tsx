import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function GoBackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-fit animate-in fade-in duration-300"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Voltar
    </Button>
  );
}
