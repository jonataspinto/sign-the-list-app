import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SessionContext } from "@/providers/session/context";
import { claimItem, unclaimItem } from "@/services/lists/items";
import { Check, ExternalLink, Loader2, X } from "lucide-react";
import { use, useTransition } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { DeleteItemDialog } from "./DeleteItemDialog";
import { EditItemDialog } from "./EditItemDialog";

export function Item({
  listId,
  item,
  ownerId,
}: {
  listId: string;
  item: Item;
  ownerId: string;
}) {
  const { user, isAuthenticated } = use(SessionContext);
  const [isClaiming, startClaimingTransition] = useTransition();
  const [isUnClaiming, startUnClaimingTransition] = useTransition();
  const isOwner = user?.id === ownerId;

  const onClaimItem = async (itemId: string) => {
    if (!item || !user) return;

    startClaimingTransition(async () => {
      try {
        await claimItem({
          listId,
          itemId,
          claimedBy: user.id,
        });
        toast.success("Item reservado com sucesso!");
      } catch (error) {
        console.error("Erro ao reservar item:", error);
        toast.error("Erro ao reservar item. Tente novamente.");
      }
    });
  };

  const onUnclaimItem = async (itemId: string) => {
    startUnClaimingTransition(async () => {
      try {
        unclaimItem({
          listId,
          itemId,
        });
        toast.success("Reserva cancelada com sucesso!");
      } catch (error) {
        console.error("Erro ao cancelar reserva:", error);
        toast.error("Erro ao cancelar reserva. Tente novamente.");
      }
    });
  };

  return (
    <Card
      key={item.name}
      className={cn([
        "border-green-200 pt-0 gap-2 relative",
        !isClaiming && item.claimedBy && "border-orange-200 bg-orange-50",
      ])}
    >
      {isOwner && (
        <>
          <DeleteItemDialog itemId={item.id!} listId={listId} />
          <EditItemDialog item={item} listId={listId} />
        </>
      )}
      <div className="w-full aspect-square rounded-t-xl overflow-hidden mb-4">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardHeader className="break-all">
        <CardTitle className="uppercase line-clamp-1">{item.name}</CardTitle>
        <CardDescription className="break-all line-clamp-3">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {item?.storeUrl && (
          <Link
            to={item.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="size-4 mr-1" />
            Ver na loja
          </Link>
        )}
      </CardContent>

      <CardFooter className="grid gap-2 mb-0 mt-auto">
        {!isAuthenticated && (
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Faça login para reservar este item
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link to="/login">Fazer Login</Link>
            </Button>
          </div>
        )}

        {isAuthenticated && (
          <>
            <Button
              size="sm"
              onClick={() => {
                onClaimItem(item.id!);
              }}
              disabled={Boolean(item?.claimedBy)}
            >
              {isClaiming ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Check className="size-4 mr-1" />
              )}
              Reservar Item
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onUnclaimItem(item.id!);
              }}
              disabled={
                !item?.claimedBy ||
                (Boolean(item?.claimedBy && item?.claimedBy !== user?.id) &&
                  !isOwner)
              }
            >
              {isUnClaiming ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <X className="size-4 mr-1" />
              )}
              Cancelar Reserva
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
