import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export function ListInfo({
  list,
  isLoading,
}: {
  list?: List | null;
  isLoading: boolean;
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
    </>
  );
}
