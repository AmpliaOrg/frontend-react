import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  TrendingUp, 
  PieChart,
  ShieldCheck,
  Percent,
  Hourglass
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function CompanyInterest() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            className="group rounded-full hover:bg-muted/80"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o início
          </Button>
        </div>

        <div className="space-y-16 text-center">
          {/* Header Section */}
          <ScrollReveal>
            <div className="space-y-6 max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground leading-[1.15]">
                Sua empresa como agente de <span className="text-primary relative inline-block">transformação.<span className="absolute bottom-1 left-0 w-full h-[4px] bg-primary/30 rounded-full"></span></span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Patrocine projetos de impacto validados, fortaleça as ações de ESG da sua empresa e aproveite incentivos fiscais significativos de forma segura e auditável.
              </p>
            </div>
          </ScrollReveal>

          {/* Benefits Grid */}
          <div className="grid gap-6 sm:grid-cols-2 text-left max-w-3xl mx-auto">
            <ScrollReveal delay={0.1}>
              <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Percent className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Dedução Fiscal do IR</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Deduzir até 9% do seu Imposto de Renda devido, direcionando-o diretamente a projetos sociais verificados e aprovados.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Destino Confiável</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Garantia de aplicação dos recursos através de contratos auditados e prestação de contas automatizada e clara.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Relatórios ESG Completos</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Gere dashboards e relatórios certificados de impacto social para auditorias corporativas e reuniões de conselho.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Valorização de Marca</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Posicione sua marca em campanhas de relevância, associando sua imagem à sustentabilidade, ética e impacto social.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Banner Box */}
          <ScrollReveal delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <Card className="border border-primary/20 bg-primary/5 text-left">
                <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Hourglass className="h-6 w-6 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-bold text-base text-foreground">Em breve: Relatórios e Repasses Automatizados</h5>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      Estamos integrando canais e parcerias para que o repasse fiscal e o abatimento no Imposto de Renda de sua empresa ocorram de forma simples e automatizada. Aguarde novidades!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
