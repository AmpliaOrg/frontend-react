import { ArrowLeft, Check, Sparkles, HeartHandshake, HelpCircle, ChevronDown, Percent, Calculator } from "lucide-react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Pricing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto w-full">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="group rounded-full hover:bg-muted/80"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o início
          </Button>
        </div>

        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Custo Zero de Adesão
            </p>
            <h1 className="text-4xl font-bold tracking-tight font-display text-foreground sm:text-5xl">
              Grátis para usar. Só pague quando <span className="text-primary">receber.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Nosso modelo é baseado puramente em resultados (Take Rate). Sem mensalidades, sem taxas de adesão, sem surpresas.
            </p>
          </div>
        </ScrollReveal>

        {/* Single Pricing Card */}
        <div className="max-w-xl mx-auto mb-16">
          <ScrollReveal delay={0.1}>
            <Card className="border-2 border-primary bg-card relative shadow-2xl shadow-primary/5 p-4 rounded-3xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="h-3 w-3" />
                Risco Zero
              </div>
              
              <CardHeader className="text-center space-y-2 pt-6">
                <div className="pt-2">
                  <span className="text-5xl font-extrabold text-foreground font-display">3,5% + R$ 0,90</span>
                  <span className="text-muted-foreground text-lg font-medium"> / por doação</span>
                </div>
                <CardDescription className="text-base leading-relaxed max-w-md mx-auto pt-2">
                  Taxa simples de intermediação sobre os valores captados. Cadastro e uso da plataforma são 100% gratuitos.
                </CardDescription>
                <div className="text-xs text-muted-foreground bg-muted/65 py-2 px-4 rounded-full inline-block mx-auto mt-2">
                  Se você não receber nenhuma doação, seu custo é <strong>R$ 0</strong>.
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 pt-6 border-t border-border/50 mt-6">
                <ul className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Uso ilimitado das ferramentas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Cadastro de ONGs gratuito</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Publicação ilimitada de vagas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Emissão de certificados digitais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Nenhum custo de configuração/setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Suporte direto da nossa equipe</span>
                  </li>
                </ul>
              </CardContent>
              
              <CardFooter className="pt-8">
                <Link href="/ong/interesse" className="w-full">
                  <Button className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold text-base shadow-lg shadow-primary/20 transition-all cursor-pointer">
                    Cadastrar minha ONG grátis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </div>

        {/* Dynamic breakdown callout */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-3xl border border-border bg-muted/20 p-8 text-center max-w-3xl mx-auto space-y-4 mb-24">
            <div className="inline-flex h-8 items-center justify-center rounded-full bg-primary/10 px-3 text-xs font-bold text-primary gap-1.5">
              <Percent className="h-4 w-4" />
              Transparência na Prática
            </div>
            <h3 className="text-xl font-bold text-foreground">Como funciona a divisão?</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              De forma prática: se a sua ONG receber uma doação de <strong>R$ 200,00</strong>, a taxa será de <strong>R$ 7,90</strong> (3,5% do valor doado, que equivale a R$ 7,00, acrescido da taxa fixa de R$ 0,90). O restante <strong>R$ 192,10</strong> vai direto para o seu projeto social.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
              <div className="p-3 bg-card border border-border rounded-xl">
                <span className="text-xs text-muted-foreground block">Amplia (3,5% + R$ 0,90)</span>
                <span className="text-lg font-bold text-primary">R$ 7,90</span>
              </div>
              <div className="p-3 bg-card border border-border rounded-xl">
                <span className="text-xs text-muted-foreground block">ONG / Projeto</span>
                <span className="text-lg font-bold text-foreground">R$ 192,10</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/pricing/calculadora">
                <Button variant="outline" className="rounded-xl border-primary/20 hover:bg-primary/5 hover:text-primary cursor-pointer gap-2">
                  <Calculator className="h-4 w-4" />
                  Simular com outros valores
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing FAQs */}
        <ScrollReveal delay={0.25}>
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold font-display text-center text-foreground mb-10">Perguntas Frequentes</h2>
            
            <div className="space-y-4">
              <details className="group border border-border bg-card rounded-2xl overflow-hidden transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-6 font-medium text-foreground hover:bg-muted/30 list-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    O que é o modelo de "Take Rate"?
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 pt-1 text-sm text-muted-foreground border-t border-border/50 leading-relaxed">
                  Significa que cobramos apenas uma porcentagem sobre os valores reais que transitam pela plataforma. Se a sua ONG não receber nenhuma doação em determinado mês, você não paga absolutamente nada. Nosso sucesso é atrelado ao seu.
                </div>
              </details>

              <details className="group border border-border bg-card rounded-2xl overflow-hidden transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-6 font-medium text-foreground hover:bg-muted/30 list-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    Existem taxas de setup ou adesão?
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 pt-1 text-sm text-muted-foreground border-t border-border/50 leading-relaxed">
                  Não. Todo o processo de onboarding, cadastro, configuração de projetos, treinamento e go-live é 100% gratuito. Não há nenhuma cobrança de setup.
                </div>
              </details>

              <details className="group border border-border bg-card rounded-2xl overflow-hidden transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-6 font-medium text-foreground hover:bg-muted/30 list-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    Há fidelidade ou contrato de longo prazo?
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 pt-1 text-sm text-muted-foreground border-t border-border/50 leading-relaxed">
                  Não. Você é livre para entrar e sair quando desejar. O cancelamento pode ser feito a qualquer momento sem taxas rescisórias, multas ou burocracia.
                </div>
              </details>
            </div>
          </div>
        </ScrollReveal>

      </main>

      <Footer />
    </div>
  );
}
