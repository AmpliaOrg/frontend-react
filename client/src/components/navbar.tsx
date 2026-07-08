import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  
  const getDashboardUrl = () => {
    if (user?.role === 'VOLUNTEER') return '/volunteer/dashboard';
    if (user?.role === 'USER') return '/donor/dashboard';
    return '/ong/dashboard';
  };

  const dashboardUrl = getDashboardUrl();

  const getLinkClass = (path: string) => {
    const isActive = location === path;
    return `text-sm transition-colors ${
      isActive 
        ? "text-primary font-bold" 
        : "text-muted-foreground hover:text-primary font-medium"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="h-10 w-10 overflow-hidden rounded-full shrink-0 flex items-center justify-center">
              <Logo className="h-10 w-10" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">Amplia</span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={getLinkClass("/")}>
            Sobre
          </Link>
          <Link href="/ong/interesse" className={getLinkClass("/ong/interesse")}>
            ONGs
          </Link>
          <Link href="/voluntario/interesse" className={getLinkClass("/voluntario/interesse")}>
            Voluntários
          </Link>
          <Link href="/empresa/interesse" className={getLinkClass("/empresa/interesse")}>
            Empresas
          </Link>
          <Link href="/fale-conosco" className={getLinkClass("/fale-conosco")}>
            Fale Conosco
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" className="hidden md:inline-flex" disabled>
            Entrar
          </Button>
          <Button className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 transition-all" disabled>
            Cadastre-se
          </Button>
        </div>
      </div>
    </nav>
  );
}
