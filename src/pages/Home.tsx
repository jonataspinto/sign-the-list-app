import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, GiftIcon, HouseHeart } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="container mx-auto py-12 flex flex-col items-center gap-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Bem-vindo ao Sign The List!
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Organize qualquer ocasião especial com facilidade! Crie, compartilhe e
          gerencie listas para chá de panela, chá de casa nova, aniversários,
          casamentos, chá de bebê, amigo secreto, formaturas, doações, eventos
          corporativos e muito mais. Centralize os itens, acompanhe os presentes
          e torne cada evento mais prático e inesquecível para todos os
          participantes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/create-list">
            <Button size="lg">Criar minha lista</Button>
          </Link>
          <Link to="/view-list">
            <Button variant="outline" size="lg">
              Ver uma lista
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Card className="p-6 flex flex-col items-center text-center">
          <Coffee className="mb-4 w-16 h-16" />
          <h2 className="text-xl font-semibold mb-2">Chá de Panela</h2>
          <p className="text-muted-foreground">
            Monte sua lista de presentes para o chá de panela e compartilhe com
            seus convidados.
          </p>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center">
          <HouseHeart className="mb-4 w-16 h-16" />
          <h2 className="text-xl font-semibold mb-2">Casa Nova</h2>
          <p className="text-muted-foreground">
            Organize tudo que precisa para sua nova casa e receba presentes dos
            amigos.
          </p>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center">
          <GiftIcon className="mb-4 w-16 h-16" />
          <h2 className="text-xl font-semibold mb-2">Lista de Presentes</h2>
          <p className="text-muted-foreground">
            Crie listas para qualquer ocasião: aniversário, casamento, amigo
            secreto e mais.
          </p>
        </Card>
      </div>
    </div>
  );
}
