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
import { resetPassword } from "@/services/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email(),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      try {
        await resetPassword(data.email);
        toast.success("Email de redefinição enviado com sucesso!");
      } catch (error) {
        const { trackError } = await import("@/lib/trackError");

        trackError(error);

        form.setError("email", { message: "Email inválido" });
      }
    });
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-xl">Redefinir Senha</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para redefinir sua senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
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
                <Button type="submit" className="cursor-pointer">
                  {isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Enviar email de redefinição"
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
