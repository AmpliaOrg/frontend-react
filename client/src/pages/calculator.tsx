import { useState } from "react";
import { ArrowLeft, Sparkles, HelpCircle, ChevronDown, Percent } from "lucide-react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function ImpactCalculator() {
  const [, setLocation] = useLocation();

  // Slider inputs
  const [donationVolume, setDonationVolume] = useState(10000); // monthly donation volume target (R$)
  const [averageDonation, setAverageDonation] = useState(150); // average donation amount (R$)

  // Math variables
  const takeRate = 0.035; // 3.5%
  const fixedFee = 0.90; // R$ 0,90
  const donationCount = Math.round(donationVolume / averageDonation);
  const ampliaFee = Math.round((donationVolume * takeRate) + (donationCount * fixedFee));
  const ngoNet = donationVolume - ampliaFee;

  // Projections
  const annualVolume = donationVolume * 12;
  const annualNgoNet = ngoNet * 12;
  const annualAmpliaFee = ampliaFee * 12;
  
  // Traditional fee estimation (e.g. 7%)
  const traditionalFee = Math.round(annualVolume * 0.07);
  const annualSavings = traditionalFee - annualAmpliaFee;

  // Impact estimation baselines
  const basketCost = 80; // R$ 80 for a food basket (cesta básica)
  const healthCost = 120; // R$ 120 for health consult
  const schoolCost = 50; // R$ 50 for school kit

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="group rounded-full hover:bg-muted/80"
            onClick={() => setLocation("/pricing")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar para Preços
          </Button>
        </div>

        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Simulador Interativo
            </p>
            <h1 className="text-4xl font-bold tracking-tight font-display text-foreground sm:text-5xl">
              Simule a sua captação de <span className="text-primary">recursos.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Ajuste as estimativas abaixo para simular na prática a divisão das doações arrecadadas e a quantidade de doações necessárias.
            </p>
          </div>
        </ScrollReveal>

        {/* Calculator layout */}
        <div className="grid gap-10 md:grid-cols-5 items-start mb-16">
          {/* Sliders card (3/5 width) */}
          <div className="md:col-span-3 space-y-8 bg-card border border-border rounded-3xl p-6 md:p-8">
            {/* Slider 1: Arrecadação Mensal */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-medium text-foreground">Volume de arrecadação mensal desejado</label>
                <span className="text-lg font-bold text-primary tabular-nums">
                  R$ {donationVolume.toLocaleString("pt-BR")}
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000" 
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                value={donationVolume}
                onChange={(e) => setDonationVolume(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider">
                <span>R$ 1.000</span>
                <span>R$ 100k</span>
              </div>
            </div>

            <div className="h-px bg-border/50"></div>

            {/* Slider 2: Ticket Médio das doações */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-medium text-foreground">Doação média por voluntário/doador</label>
                <span className="text-lg font-bold text-primary tabular-nums">
                  R$ {averageDonation.toLocaleString("pt-BR")}
                </span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="500" 
                step="10" 
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                value={averageDonation}
                onChange={(e) => setAverageDonation(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider">
                <span>R$ 20</span>
                <span>R$ 500</span>
              </div>
            </div>
          </div>

          {/* Results card (2/5 width) */}
          <div className="md:col-span-2 space-y-4 md:sticky md:top-28">
            <Card className="border-2 border-primary bg-card shadow-xl shadow-primary/5 rounded-3xl overflow-hidden p-2">
              <CardHeader className="space-y-1">
                <div className="inline-flex h-6 items-center justify-center rounded-full bg-primary/10 px-2.5 text-xs font-bold text-primary gap-1">
                  <Percent className="h-3.5 w-3.5" />
                  Divisão de Recursos (3,5% + R$ 0,90)
                </div>
                <CardTitle className="text-2xl font-bold font-display pt-2">Detalhamento</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-5">
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest block font-semibold">Repassado para a ONG</span>
                  <p className="text-3xl font-extrabold text-foreground mt-1 tabular-nums">
                    R$ {ngoNet.toLocaleString("pt-BR")}
                  </p>
                  <span className="text-xs text-muted-foreground">Líquido direto para o projeto social</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/20 border border-border/50 rounded-xl">
                    <span className="text-xs text-muted-foreground block font-medium">Taxa Amplia</span>
                    <span className="text-base font-bold text-primary block mt-0.5 tabular-nums">
                      R$ {ampliaFee.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="p-3 bg-muted/20 border border-border/50 rounded-xl">
                    <span className="text-xs text-muted-foreground block font-medium">Nº de Doações</span>
                    <span className="text-base font-bold text-foreground block mt-0.5 tabular-nums">
                      {donationCount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Link href="/ong/interesse" className="w-full block">
              <Button className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold text-base shadow-lg shadow-primary/20 transition-all cursor-pointer">
                Começar Captação Grátis
              </Button>
            </Link>
          </div>
        </div>

        {/* Projections Section */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-8 mb-24">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-display text-foreground sm:text-3xl">Projeções Anuais de Captação e Impacto</h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Confira o potencial acumulado das suas doações ao longo de um ano e o impacto social direto gerado.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {/* Card 1: Projeção Anual */}
              <div className="p-6 border border-border rounded-2xl bg-card flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Projeção Anual</span>
                  <p className="text-3xl font-extrabold text-foreground mt-2 tabular-nums">
                    R$ {annualVolume.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Arrecadados em 12 meses.
                  </p>
                </div>
                <div className="pt-4 border-t border-border/50 mt-4 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Líquido p/ Projetos:</span>
                    <strong className="text-foreground">R$ {annualNgoNet.toLocaleString("pt-BR")}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa da plataforma:</span>
                    <span>R$ {annualAmpliaFee.toLocaleString("pt-BR")}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Economia de Taxas */}
              <div className="p-6 border border-border rounded-2xl bg-card flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Economia Estimada</span>
                  <p className="text-3xl font-extrabold text-primary mt-2 tabular-nums">
                    + R$ {annualSavings.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Economizados em taxas anuais.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground pt-4 border-t border-border/50 mt-4 leading-relaxed">
                  Comparado a plataformas tradicionais com taxas médias de 7%. Esse valor economizado retorna diretamente para apoiar sua causa!
                </p>
              </div>

              {/* Card 3: Impacto Social Estimado */}
              <div className="p-6 bg-gradient-to-tr from-primary/10 to-primary/5 border border-primary/20 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Impacto Social Anual</span>
                  <div className="space-y-3 mt-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center bg-card/50 p-2 rounded-xl border border-border/50">
                      <span>Cestas Básicas:</span>
                      <strong className="text-foreground text-sm font-bold tabular-nums">
                        ~{Math.round(annualNgoNet / basketCost).toLocaleString("pt-BR")}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center bg-card/50 p-2 rounded-xl border border-border/50">
                      <span>Atendimentos Médicos:</span>
                      <strong className="text-foreground text-sm font-bold tabular-nums">
                        ~{Math.round(annualNgoNet / healthCost).toLocaleString("pt-BR")}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center bg-card/50 p-2 rounded-xl border border-border/50">
                      <span>Kits Escolares:</span>
                      <strong className="text-foreground text-sm font-bold tabular-nums">
                        ~{Math.round(annualNgoNet / schoolCost).toLocaleString("pt-BR")}
                      </strong>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 leading-normal">
                  *Cálculos baseados em custos médios estimados de mercado (Cesta R$ 80, Atendimento R$ 120, Kit R$ 50).
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold font-display text-center text-foreground mb-10">Dúvidas sobre o Simulador</h2>
            
            <div className="space-y-4">
              <details className="group border border-border bg-card rounded-2xl overflow-hidden transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-6 font-medium text-foreground hover:bg-muted/30 list-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    Como a taxa da Amplia é deduzida?
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 pt-1 text-sm text-muted-foreground border-t border-border/50 leading-relaxed">
                  A taxa de 3,5% + R$ 0,90 é processada e retida automaticamente na liquidação de cada transação de doação realizada através da plataforma. O restante do valor líquido é transferido diretamente para a conta bancária cadastrada da sua ONG.
                </div>
              </details>

              <details className="group border border-border bg-card rounded-2xl overflow-hidden transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer py-4 px-6 font-medium text-foreground hover:bg-muted/30 list-none">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    Existe limite mínimo ou máximo de captação mensal?
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 pt-1 text-sm text-muted-foreground border-t border-border/50 leading-relaxed">
                  Não. Sua ONG pode captar qualquer montante mensal sem bloqueios ou penalidades. O modelo se adequa desde pequenos projetos locais até grandes arrecadações nacionais de impacto.
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
