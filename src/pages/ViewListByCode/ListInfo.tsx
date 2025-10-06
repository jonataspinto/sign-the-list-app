import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { copyToClipboard } from "@/lib/utils";
import { Calendar, Pencil, Plus, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function ListInfo({
  list,
  isLoading,
  isOwner,
}: {
  list?: List | null;
  isLoading: boolean;
  isOwner?: boolean;
}) {
  if (!list && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <CardHeader>
          <Skeleton className="max-w-72 w-full h-7" />
          <Skeleton className="w-full h-5" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-sm" />
            <Skeleton className="h-5 w-full max-w-72" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-40" />
          </div>
        </CardFooter>
      </>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">{list?.title}</CardTitle>
        <p className="text-gray-600 text-sm">{list?.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Data do Evento:</span>
          <span>
            {list?.eventDate &&
              Intl.DateTimeFormat("pt-BR", {
                dateStyle: "long",
              }).format(new Date(list.eventDate))}
          </span>
        </div>
      </CardContent>
      {isOwner && (
        <CardFooter>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                copyToClipboard(list?.shareCode, () => {
                  toast.success("Código copiado para a área de transferência!");
                });
              }}
              className="p-0 border-none bg-gray-100 px-2 py-1 rounded text-sm font-mono cursor-pointer"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {list?.shareCode}
            </Button>
            <Button asChild size="sm">
              <Link to={`/my-lists/${list?.id}/add-item`}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </Link>
            </Button>
            <Button variant="outline" asChild size="sm">
              <Link to={`/lists/${list?.id}/edit`}>
                <Pencil className="w-4 h-4 mr-2" />
                Editar Lista
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </>
  );
}
