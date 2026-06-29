import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function TermsOfUse() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 max-w-3xl mx-auto w-full">
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
          <div className="space-y-8 text-left">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-display text-foreground sm:text-4xl">
                Termos de Uso
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Última atualização: 29 de junho de 2026
              </p>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Bem-vindo à <strong>Amplia</strong>. Ao acessar ou utilizar nossa plataforma, você concorda em cumprir e estar sujeito aos seguintes Termos de Uso. Se você não concordar com estes termos, por favor, não utilize nossos serviços.
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">1. Aceite dos Termos</h3>
                <p>
                  A Amplia fornece uma plataforma de colaboração digital que conecta organizações sem fins lucrativos (ONGs), voluntários e patrocinadores corporativos (Empresas). Ao se cadastrar ou navegar na plataforma, você declara possuir capacidade legal para aceitar estes termos.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">2. Escopo dos Serviços</h3>
                <p>
                  A plataforma funciona como um ecossistema de facilitação, fornecendo ferramentas para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Divulgação e gestão de projetos sociais por ONGs verificadas.</li>
                  <li>Recrutamento de voluntários com competências personalizadas e emissão de certificados.</li>
                  <li>Patrocínio direto rastreável para empresas alinhadas aos pilares ESG.</li>
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">3. Cadastro e Segurança</h3>
                <p>
                  Para utilizar determinados recursos da Amplia, você deve criar uma conta fornecendo dados exatos e atualizados. Você é inteiramente responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem sob sua conta.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">4. Propriedade Intelectual</h3>
                <p>
                  Todo o conteúdo visual, códigos, marcas e logotipos apresentados na plataforma são propriedade exclusiva da Amplia ou de suas ONGs licenciadoras parceiras. O uso não autorizado de qualquer material da plataforma é estritamente proibido.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">5. Limitação de Responsabilidade</h3>
                <p>
                  A Amplia atua como intermediária de impacto social. Embora façamos a validação de documentos corporativos e CNPJ das ONGs parceiras, não nos responsabilizamos pelo comportamento offline de voluntários ou pelas execuções operacionais diárias das organizações parceiras.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/40 mt-8">
                <h3 className="text-lg font-bold text-foreground">Dúvidas sobre os Termos?</h3>
                <p>
                  Se você tiver qualquer dúvida em relação a este documento, por favor, entre em contato através do nosso canal de suporte em <a href="mailto:ampliaorg@gmail.com" className="text-primary hover:underline">ampliaorg@gmail.com</a>.
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
