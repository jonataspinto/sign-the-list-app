import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { loginWithEmail, loginWithGoogle } from "@/services/firebase";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      try {
        await loginWithEmail(data.email, data.password);
      } catch (error) {
        const { trackError } = await import("@/lib/trackError");

        trackError(error);
        toast.error("Erro ao fazer login");
        form.setError("email", { message: "Email ou senha inválidos" });
        form.setError("password", { message: "Email ou senha inválidos" });
      }
    });
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com seu email e senha para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...form.register("email")}
                  className={
                    form.formState.errors.email ? "border-red-500" : ""
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...form.register("password")}
                  className={
                    form.formState.errors.password ? "border-red-500" : ""
                  }
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Entrar"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                type="button"
                onClick={loginWithGoogle}
              >
                <img src="/google-icon.svg" alt="Google" className="size-4" />
                Continuar com Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
