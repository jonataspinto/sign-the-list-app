import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getListById, updateList } from "@/services/lists";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function EditListPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<List | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!listId) return;
    getListById(listId)
      .then((data) => {
        setList(data);
        setForm({
          title: data.title,
          description: data.description,
          eventDate: data.eventDate?.slice(0, 10) || "",
        });
      })
      .catch(() => {
        toast.error("Lista não encontrada");
        navigate(`/my-lists/${listId}`);
      });
  }, [listId, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!list) return;
    setSaving(true);
    try {
      await updateList(list.id, {
        ...form,
      });
      toast.success("Lista atualizada com sucesso!");
      navigate(`/my-lists/${list.id}/`);
    } catch {
      toast.error("Erro ao atualizar lista");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 ">
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Editar lista</h1>
        <Card>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="title" className="mb-2">
                  Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description" className="mb-2">
                  Descrição
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventDate" className="mb-2">
                  Data do Evento
                </Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" disabled={saving} className="w-full">
                {saving ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
