import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SessionContext } from "@/providers/session/context";
import { getListsByOwner } from "@/services/lists";
import { Calendar, Share2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function MyLists() {
  const [lists, setLists] = useState<ListCollection | null>(null);

  const { user } = use(SessionContext);

  useEffect(() => {
    (async () => {
      if (user) {
        const response = await getListsByOwner(user?.id);

        setLists(response);
      }
    })();
  }, [user]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Minhas listas
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {lists?.map((list) => (
          <Card>
            <CardHeader>
              <CardTitle>{list.title}</CardTitle>
              <CardDescription>{list.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center">
                <Calendar className="size-4" />
                <p>
                  {Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "full",
                  }).format(new Date(list.eventDate))}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Share2 className="size-4" />
                <p>{list.shareCode}</p>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button type="button" className="w-full" asChild>
                <Link to={`/my-lists/${list.id}`}>Ver Lista</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
