import { ArrowLeft, ShieldCheck, HeartHandshake, Eye, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function TransparencyPortal() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto w-full">
        {/* Back Link */}
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
          <div className="space-y-10 text-left">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-display text-foreground sm:text-4xl">
                Portal de Transparência
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Nossa prioridade número um é garantir que cada centavo e cada hora de voluntariado cheguem onde realmente importa.
              </p>
            </div>

            {/* Metrics cards grid */}
            <div className="grid gap-6 sm:grid-cols-3">
              <Card className="border border-border/80 bg-muted/20">
                <CardContent className="p-6 space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">100% Auditável</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Toda doação financeira é registrada com trilha de auditoria completa desde a transação até a execução do projeto.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border/80 bg-muted/20">
                <CardContent className="p-6 space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Certificação Real</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Certificados digitais emitidos possuem chaves criptográficas exclusivas para verificação acadêmica e profissional imediata.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border/80 bg-muted/20">
                <CardContent className="p-6 space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Taxas Baixíssimas</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Repasses de doações são efetuados com taxas operacionais mínimas para sustentar a infraestrutura sem prejudicar os projetos.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                A <strong>Amplia</strong> nasceu com o propósito de solucionar a falta de confiança e a burocracia na gestão do terceiro setor. Construímos pontes digitais baseadas na clareza absoluta e na rastreabilidade total das ações.
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">Como Funcionam as Doações?</h3>
                <p>
                  As empresas e doadores individuais utilizam nosso sistema integrado de pagamentos. Ao efetuar uma doação, os fundos são segregados e transferidos diretamente para as contas bancárias verificadas e associadas ao CNPJ da ONG beneficiada. Não retemos valores sob custódia prolongada e fornecemos um painel de prestação de contas que atualiza os gastos em tempo real.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">Processo de Validação de ONGs</h3>
                <p>
                  Antes de um projeto social ou edital de voluntariado ser publicado na Amplia, a nossa equipe jurídica analisa a saúde fiscal e a documentação oficial da ONG (CNPJ ativo, certidões negativas de débito federal, estatuto social e histórico de projetos anteriores). Isso previne fraudes e assegura parcerias confiáveis.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">Políticas ESG e Prestação de Contas Corporativa</h3>
                <p>
                  Para empresas parceiras que fazem uso dos incentivos fiscais da Lei do Bem ou dedução direta de até 9% do IR devido, a Amplia fornece relatórios certificados e consolidados com os comprovantes bancários oficiais, assinaturas dos voluntários e fotos da execução dos projetos sociais financiados para facilitar auditorias e relatórios de sustentabilidade.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/40 mt-8">
                <h3 className="text-lg font-bold text-foreground">Informações Adicionais</h3>
                <p>
                  Se sua organização deseja analisar nossos termos fiscais, estatísticas gerais ou fazer uma auditoria técnica de repasses, escreva-nos diretamente no e-mail <a href="mailto:ampliaorg@gmail.com" className="text-primary hover:underline">ampliaorg@gmail.com</a>.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
