import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import logo from "@assets/Amplia.svg";
import { useAuth } from "@/contexts/AuthContext";

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
          <Link href="/">
            <a className={getLinkClass("/")}>
              Sobre
            </a>
          </Link>
          <Link href="/ong/interesse">
            <a className={getLinkClass("/ong/interesse")}>
              ONGs
            </a>
          </Link>
          <Link href="/voluntario/interesse">
            <a className={getLinkClass("/voluntario/interesse")}>
              Voluntários
            </a>
          </Link>
          <Link href="/empresa/interesse">
            <a className={getLinkClass("/empresa/interesse")}>
              Empresas
            </a>
          </Link>
          <Link href="/fale-conosco">
            <a className={getLinkClass("/fale-conosco")}>
              Fale Conosco
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden md:inline-flex">
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
              Cadastre-se
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
