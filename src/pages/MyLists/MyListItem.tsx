import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteListDialog from "./DeleteListDialog";

export function MyListItem({ list }: { list: List }) {
  return (
    <Card key={list.id} className="relative">
      <DeleteListDialog listId={list.id} />
      <CardHeader>
        <CardTitle className="h-6 uppercase">{list.title}</CardTitle>
        <CardDescription className="text-sm">
          {list.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex gap-2 items-center text-sm">
          <Calendar className="size-4" />
          <p>
            {Intl.DateTimeFormat("pt-BR", {
              dateStyle: "medium",
            }).format(new Date(list.eventDate))}
          </p>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <Share2 className="size-4" />
          <p>{list.shareCode}</p>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 mt-auto mb-0">
        <Button type="button" className="w-full" asChild>
          <Link to={`/my-lists/${list.id}`}>Ver Lista</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function MyListItemSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-5  w-3/4" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-5 w-1/4" />
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Skeleton className="w-full h-9" />
      </CardFooter>
    </Card>
  );
}
