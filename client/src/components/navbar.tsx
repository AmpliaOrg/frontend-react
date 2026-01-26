import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logo from "@assets/Amplia.svg";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <a className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <img src={logo} alt="Amplia Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">Amplia</span>
            </a>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#sobre" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Sobre
          </a>
          <a href="#ongs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            ONGs
          </a>
          <a href="#voluntarios" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Voluntários
          </a>
          <a href="#empresas" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Empresas
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="hidden md:inline-flex">
              Entrar
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
              Quero Participar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
