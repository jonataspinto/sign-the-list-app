import { SessionContext } from "@/providers/session/context";
import { use } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export function AvatarLink() {
  const { user, isLoading } = use(SessionContext);

  const [firstName, lastName] = (user?.name || "u n").split(" ");

  if (isLoading) {
    return <Skeleton className="size-10 rounded-full" />;
  }
  return (
    <Link to="/profile" aria-label="Profile">
      <Avatar>
        <AvatarImage src={user?.photoURL} />
        <AvatarFallback className="uppercase">
          {firstName?.charAt?.(0)}
          {lastName?.charAt?.(0)}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
