import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      try {
        console.log("🚀 ~ SignupForm ~ data:", data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(error);
        toast.error("Erro ao fazer login");
        form.setError("email", { message: "Email ou senha inválidos" });
        form.setError("password", { message: "Email ou senha inválidos" });
      }
    });
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-xl">Crie sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...form.register("name")}
                  className={form.formState.errors.name ? "border-red-500" : ""}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
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
              </Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...form.register("password")}
                    className={
                      form.formState.errors.password ? "border-red-500" : ""
                    }
                  />
                </Field>
                <FieldDescription>
                  Deve ter pelo menos 8 caracteres.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="cursor-pointer">
                  {isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Já tem uma conta? <Link to="/login">Entrar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao clicar em continuar, você concorda com nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  );
}
