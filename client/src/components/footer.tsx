import { Link } from "wouter";
import logo from "@assets/Amplia.svg";
import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-2 transition-opacity hover:opacity-80">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img src={logo} alt="Amplia Logo" className="h-full w-full object-contain" />
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-foreground">Amplia</span>
              </a>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Uma ponte digital entre quem quer ajudar e quem precisa ser ajudado. Transparência e impacto real.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Plataforma</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Para ONGs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Para Voluntários</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Para Empresas</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Transparência</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Fique por dentro</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors shadow-sm">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors shadow-sm">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors shadow-sm">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2025 Amplia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
