import { getListById } from "@/services/lists";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export type AddItemFormData = {
  name: string;
  description: string;
  imageUrl: string;
  storeUrl: string;
  repeat?: number;
};

export function useAddItemPage() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const [list, setList] = useState<List | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<AddItemFormData>();

  useEffect(() => {
    const fetchList = async () => {
      if (!listId) return;

      try {
        setIsLoading(true);
        const listData = await getListById(listId);
        setList(listData);
      } catch (error) {
        const { trackError } = await import("@/lib/trackError");

        trackError(error);
        toast.error("Erro ao carregar lista");
        navigate("/my-lists");
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [listId, navigate]);

  return { list, isLoading, form, listId };
}
