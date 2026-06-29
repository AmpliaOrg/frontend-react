import { Link } from "wouter";
import { Logo } from "@/components/Logo";
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
                <div className="h-8 w-8 overflow-hidden rounded-full shrink-0 flex items-center justify-center">
                  <Logo className="h-8 w-8" />
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
              <li>
                <Link href="/">
                  <a className="hover:text-primary transition-colors">Sobre nós</a>
                </Link>
              </li>
              <li>
                <Link href="/ong/interesse">
                  <a className="hover:text-primary transition-colors">Para ONGs</a>
                </Link>
              </li>
              <li>
                <Link href="/voluntario/interesse">
                  <a className="hover:text-primary transition-colors">Para Voluntários</a>
                </Link>
              </li>
              <li>
                <Link href="/empresa/interesse">
                  <a className="hover:text-primary transition-colors">Para Empresas</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/termos-de-uso">
                  <a className="hover:text-primary transition-colors">Termos de Uso</a>
                </Link>
              </li>
              <li>
                <Link href="/privacidade">
                  <a className="hover:text-primary transition-colors">Privacidade</a>
                </Link>
              </li>
              <li>
                <Link href="/transparencia">
                  <a className="hover:text-primary transition-colors">Transparência</a>
                </Link>
              </li>
              <li>
                <Link href="/fale-conosco">
                  <a className="hover:text-primary transition-colors">Fale Conosco</a>
                </Link>
              </li>
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
              <a href="mailto:ampliaorg@gmail.com?subject=Contato%20Plataforma%20Amplia" className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors shadow-sm">
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
