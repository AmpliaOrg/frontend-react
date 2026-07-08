import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import notFoundImage from "@assets/generated_images/notfound.png";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 text-center select-none">
      <div className="max-w-md w-full space-y-8 flex flex-col items-center">
        {/* Not Found Illustration */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 overflow-hidden rounded-3xl drop-shadow-2xl border border-border/40">
          <img 
            src={notFoundImage} 
            alt="Página não encontrada" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold font-display text-foreground sm:text-4xl">
            Página não encontrada
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            O link que você acessou pode estar quebrado, expirado ou a página foi movida para outro endereço.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Link href="/">
            <Button size="lg" className="rounded-xl font-semibold cursor-pointer shadow-lg shadow-primary/20 gap-2 h-12 px-6">
              <Home className="h-4 w-4" />
              Voltar para a Página Inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
