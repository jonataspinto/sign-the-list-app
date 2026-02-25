import { getByEmail } from "@/services/users";
import { useEffect, useState, type ReactNode } from "react";
import { subscribeAuth } from "../../services/firebase/auth";
import { SessionContext } from "./context";

type SessionContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeAuth(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getByEmail(firebaseUser.email!);
          setUser(userData);
        } catch (error) {
          const { trackError } = await import("@/lib/trackError");

          trackError(error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: SessionContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
  };

  return <SessionContext value={value}>{children}</SessionContext>;
}
