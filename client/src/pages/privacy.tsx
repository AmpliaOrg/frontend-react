import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function PrivacyPolicy() {
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
                Diretrizes de Privacidade
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Última atualização: 29 de junho de 2026
              </p>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                A <strong>Amplia</strong> valoriza a sua privacidade e está comprometida em proteger as suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos os seus dados ao interagir com a nossa plataforma.
              </p>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">1. Coleta de Informações</h3>
                <p>
                  Coletamos informações essenciais para o funcionamento seguro da plataforma, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dados de Registro:</strong> Nome da organização, CNPJ, e-mail de contato, nome do usuário, telefone e endereço.</li>
                  <li><strong>Dados de Atividade:</strong> Histórico de horas de voluntariado, projetos apoiados e transações financeiras de doações.</li>
                  <li><strong>Metadados do Dispositivo:</strong> Endereços IP, tipo de navegador e informações de navegação para auditorias de segurança.</li>
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">2. Uso dos Dados</h3>
                <p>
                  Suas informações são utilizadas estritamente para os seguintes propósitos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Validar a legalidade corporativa das ONGs e empresas parceiras.</li>
                  <li>Emitir e validar certificados de horas complementares de voluntários.</li>
                  <li>Gerar relatórios de transparência de repasse e auditoria de impacto social.</li>
                  <li>Enviar atualizações operacionais importantes sobre projetos ou contas.</li>
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">3. Compartilhamento de Informações</h3>
                <p>
                  A Amplia <strong>não comercializa</strong> dados pessoais. O compartilhamento ocorre apenas de forma transparente no escopo das atividades da plataforma:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dados profissionais e acadêmicos de voluntários são exibidos para ONGs onde eles manifestarem interesse em vagas.</li>
                  <li>Repasses financeiros e dados de transação fiscal de doadores são informados para a própria organização beneficiária e órgãos de controle fiscal regulatório.</li>
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-xl font-bold text-foreground">4. Segurança de Dados</h3>
                <p>
                  Empregamos medidas técnicas e organizacionais avançadas (como criptografia de ponta a ponta e auditoria contínua de infraestrutura) para manter seus dados protegidos contra acessos não autorizados ou destruição acidental.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/40 mt-8">
                <h3 className="text-lg font-bold text-foreground">Contato para Privacidade</h3>
                <p>
                  Você pode solicitar a exclusão total ou consulta de seus dados pessoais armazenados enviando um e-mail para o nosso Encarregado de Proteção de Dados (DPO) através de <a href="mailto:ampliaorg@gmail.com" className="text-primary hover:underline">ampliaorg@gmail.com</a>.
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
