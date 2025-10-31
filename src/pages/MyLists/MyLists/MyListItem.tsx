import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { copyToClipboard } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { DeleteListDialog } from "./DeleteListDialog";

export function MyListItem({ list }: { list: List }) {
  return (
    <Card key={list.id} className="relative animate-in fade-in duration-700">
      <DeleteListDialog listId={list.id} />
      <CardHeader>
        <CardTitle className="uppercase line-clamp-1">{list.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3">
          {list.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="grid grid-cols-2 gap-2 mt-auto mb-0">
        <Button
          className="flex gap-2 items-center text-sm"
          variant="outline"
          size="sm"
          onClick={() => {
            copyToClipboard(list.shareCode, () => {
              toast.success("Código de compartilhamento copiado!");
            });
          }}
        >
          <Copy className="size-4" />
          <p>{list.shareCode}</p>
        </Button>
        <Button type="button" asChild>
          <Link to={`/my-lists/${list.id}`}>Ver Lista</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function MyListItemSkeleton() {
  return (
    <Card className="relative animate-in fade-in duration-700">
      <Skeleton className="absolute right-4 top-4 size-5 rounded-sm" />
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-5  w-3/4" />
      </CardHeader>

      <CardFooter className="grid grid-cols-2 gap-2 mt-auto mb-0">
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
      </CardFooter>
    </Card>
  );
}
