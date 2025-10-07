import { SessionContext } from "@/providers/session/context";
import { use } from "react";
import { Link, Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export function Layout() {
  const { user, isLoading } = use(SessionContext);

  const [firstName, lastName] = (user?.name || "u n").split(" ");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 shadow-md">
        <div className="container flex items-center justify-between mx-auto">
          <Navigation />

          {isLoading ? (
            <Skeleton className="size-10 rounded-full" />
          ) : (
            <Link to="/profile" aria-label="Profile">
              <Avatar>
                <AvatarImage src={user?.photoURL} />
                <AvatarFallback className="uppercase">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </header>

      <div className="container mx-auto p-6">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
