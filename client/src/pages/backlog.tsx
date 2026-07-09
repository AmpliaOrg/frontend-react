import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ArrowLeft,
  Calendar,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface BacklogItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Crítica" | "Alta" | "Média" | "Baixa";
  target: "ONGs" | "Voluntários" | "Doadores" | "Empresas" | "Plataforma";
}

const todoItems: BacklogItem[] = [
  {
    id: "todo-1",
    title: "Publicação e Gestão de Vagas de Voluntariado",
    description: "Painel para ONGs publicarem ações presenciais ou remotas, com filtros por causas e habilidades necessárias para voluntários.",
    category: "Voluntariado",
    priority: "Alta",
    target: "Voluntários",
  },
  {
    id: "todo-2",
    title: "Módulo de Editais de Recursos e Projetos",
    description: "Portal para criação, divulgação e candidatura de projetos a editais de fomento e recursos financeiros institucionais.",
    category: "Editais",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "todo-3",
    title: "Certificados com Assinatura Digital",
    description: "Geração automática de certificados de horas voluntárias em PDF assinado digitalmente para validação universitária.",
    category: "Voluntariado",
    priority: "Média",
    target: "Voluntários",
  },
  {
    id: "todo-4",
    title: "Dashboard ESG para Empresas Parceiras",
    description: "Painel corporativo para monitoramento de horas doadas por funcionários, geração de relatórios e fomento ao voluntariado empresarial.",
    category: "ESG",
    priority: "Média",
    target: "Empresas",
  },
  {
    id: "todo-5",
    title: "Relatórios Periódicos de Impacto Social",
    description: "Envio automatizado de infográficos para doadores mostrando exatamente o destino físico dos recursos destinados às causas.",
    category: "Transparência",
    priority: "Alta",
    target: "Doadores",
  },
  {
    id: "todo-6",
    title: "Favoritar ONGs Parceiras",
    description: "Módulo para voluntários e doadores salvarem suas organizações favoritas para receberem alertas e atualizações de novas ações.",
    category: "Interação",
    priority: "Baixa",
    target: "Voluntários",
  },
  {
    id: "todo-7",
    title: "Validação Pública de Certificados",
    description: "Portal público de verificação por código de autenticidade (hash), permitindo a instituições e faculdades validarem os certificados emitidos.",
    category: "Segurança",
    priority: "Média",
    target: "Plataforma",
  },
  {
    id: "todo-8",
    title: "Páginas de Divulgação da ONG (Public Hub)",
    description: "Geração de páginas públicas personalizáveis para as ONGs divulgarem sua história, metas, contatos e receberem doações diretamente.",
    category: "Comunicação",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "todo-9",
    title: "Emissão de Recibos e Notas Fiscais",
    description: "Módulo para download automático de recibos de transações e integração com sistemas municipais para emissão de notas fiscais de doação.",
    category: "Finanças",
    priority: "Média",
    target: "Doadores",
  },
  {
    id: "todo-10",
    title: "Selo de ONG Certificada (Compliance)",
    description: "Processo de auditoria documental e concessão do selo de verificação pública na plataforma, garantindo maior segurança aos doadores.",
    category: "Segurança",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "todo-11",
    title: "Doações Recorrentes (Cartão de Crédito)",
    description: "Módulo para permitir que doadores configurem contribuições mensais automáticas via assinatura de cartão de crédito.",
    category: "Finanças",
    priority: "Alta",
    target: "Doadores",
  },
  {
    id: "todo-12",
    title: "Repasse Automático de Saldos (Payout)",
    description: "Automatização do repasse direto de saldos arrecadados para a conta bancária da ONG cadastrada, dispensando solicitações manuais de saque.",
    category: "Finanças",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "todo-13",
    title: "Módulo Financeiro e de Extratos (ONGs)",
    description: "Interface para que as organizações gerenciem extratos, relatórios fiscais de recebimento e solicitem transferências manuais de saldos.",
    category: "Finanças",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "todo-14",
    title: "Gestão Avançada de Projetos (ONGs)",
    description: "Ferramenta completa para criação, edição e monitoramento de metas de arrecadação financeira para projetos sociais individuais.",
    category: "Projetos",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "todo-15",
    title: "Configurações e Permissões de Equipe (ONGs)",
    description: "Painel de controle interno para gerenciamento de perfis de equipe, preferências de notificações e chaves de API.",
    category: "Configurações",
    priority: "Baixa",
    target: "ONGs",
  },
  {
    id: "todo-16",
    title: "Histórico e Auditoria de Atividades",
    description: "Rastreamento em tempo real de logs de auditoria, interações de voluntários com vagas e confirmações de transações financeiras.",
    category: "Segurança",
    priority: "Média",
    target: "Plataforma",
  },
  {
    id: "todo-17",
    title: "Estatísticas de Impacto e Nível do Doador",
    description: "Painel estatístico exibindo o total doado acumulado, número de vidas impactadas, medalhas e níveis de engajamento social.",
    category: "Engajamento",
    priority: "Média",
    target: "Doadores",
  }
];

const inProgressItems: BacklogItem[] = [
  {
    id: "prog-1",
    title: "Geração de Doação Pix via AbacatePay",
    description: "Integração do fluxo de doações financeiras via Pix, gerando checkouts dinâmicos e restringindo o acesso (bloqueio a ONGs).",
    category: "Finanças",
    priority: "Crítica",
    target: "Doadores",
  },
  {
    id: "prog-2",
    title: "Modelo de Precificação de Taxa Única (3.5%)",
    description: "Estruturação das regras de negócio de intermediação e transação na plataforma (take rate de 3.5%), livre de taxas de adesão.",
    category: "Finanças",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "prog-3",
    title: "Webhooks de Confirmação Pix (AbacatePay)",
    description: "Implementação de escuta assíncrona dos status de checkout para atualização instantânea de saldo e notificação de doações pagas.",
    category: "Finanças",
    priority: "Crítica",
    target: "Plataforma",
  },
  {
    id: "prog-4",
    title: "Painel Financeiro & Solicitação de Saques",
    description: "Integração do painel de controle financeiro para ONGs gerenciarem valores recebidos e efetuarem a transferência (saque Pix) de saldos.",
    category: "Finanças",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "prog-5",
    title: "Painel de Auditoria e Validação de ONGs",
    description: "Módulo administrativo interno para validação manual de documentação, estatuto social e verificação antibraude de ONGs candidatas.",
    category: "Segurança",
    priority: "Alta",
    target: "Plataforma",
  },
  {
    id: "prog-6",
    title: "Cadastro de ONGs & Mapa das OSCs (IPEA)",
    description: "Finalização do formulário completo de registro de ONGs integrado com consultas e validação automática de dados públicos do Mapa das OSCs.",
    category: "Integração",
    priority: "Alta",
    target: "ONGs",
  }
];

const doneItems: BacklogItem[] = [
  {
    id: "done-1",
    title: "Landing Page & Design System Escuro/Claro",
    description: "Desenvolvimento da página inicial institucional da Amplia com transição fluida de temas e logotipo SVG compatível com Safari/iOS.",
    category: "Interface",
    priority: "Alta",
    target: "Plataforma",
  },
  {
    id: "done-2",
    title: "Captação de Interesse das ONGs (Leads)",
    description: "Formulário inteligente com validação integrada de CNPJ e dados de contato para ONGs participarem da fase de pré-lançamento.",
    category: "Comercial",
    priority: "Alta",
    target: "ONGs",
  },
  {
    id: "done-3",
    title: "Portal de Transparência & Regulatório",
    description: "Entrega do portal público de transparência, Termos de Uso e Política de Privacidade para conformidade institucional.",
    category: "Legal",
    priority: "Média",
    target: "Plataforma",
  }
];

export default function BacklogPage() {
  const [, setLocation] = useLocation();
  const getPriorityBadge = (priority: BacklogItem["priority"]) => {
    switch (priority) {
      case "Crítica":
        return <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/10 text-rose-500 uppercase tracking-wider">Crítica</span>;
      case "Alta":
        return <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-500 uppercase tracking-wider">Alta</span>;
      case "Média":
        return <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold bg-blue-500/10 text-blue-500 uppercase tracking-wider">Média</span>;
      default:
        return <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold bg-slate-500/10 text-slate-500 uppercase tracking-wider">Baixa</span>;
    }
  };

  const getTargetBadge = (target: BacklogItem["target"]) => {
    switch (target) {
      case "ONGs":
        return <span className="text-xs font-semibold text-emerald-500 dark:text-emerald-400">ONGs</span>;
      case "Voluntários":
        return <span className="text-xs font-semibold text-primary">Voluntários</span>;
      case "Doadores":
        return <span className="text-xs font-semibold text-purple-500 dark:text-purple-400">Doadores</span>;
      case "Empresas":
        return <span className="text-xs font-semibold text-cyan-500 dark:text-cyan-400">Empresas</span>;
      default:
        return <span className="text-xs font-semibold text-muted-foreground">Sistema</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border/45 pb-8">
            <div className="space-y-3">
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
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h1 className="text-4xl font-bold font-display tracking-tight text-foreground">
                  Roadmap & Backlog
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Acompanhe de forma transparente o progresso do desenvolvimento da Amplia. Este painel ilustra as prioridades planejadas, os módulos em desenvolvimento e o que já foi entregue.
              </p>
            </div>
          </div>

          {/* Kanban Board Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* COLUMN 1: TO DO */}
            <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-border/20">
              <div className="flex items-center justify-between border-b border-border/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <h2 className="font-bold text-base font-heading text-foreground">Planejado (To Do)</h2>
                </div>
                <span className="text-xs font-bold text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full shrink-0">
                  {todoItems.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {todoItems.map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 0.04}>
                    <div className="p-4 bg-card border border-border/40 hover:border-border/80 rounded-xl transition-all duration-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        {getTargetBadge(item.target)}
                        {getPriorityBadge(item.priority)}
                      </div>
                      <h3 className="font-bold text-sm text-foreground leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* COLUMN 2: IN PROGRESS */}
            <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-border/20">
              <div className="flex items-center justify-between border-b border-border/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0 animate-pulse" />
                  <h2 className="font-bold text-base font-heading text-foreground">Em Progresso</h2>
                </div>
                <span className="text-xs font-bold text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full shrink-0">
                  {inProgressItems.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {inProgressItems.map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 0.04}>
                    <div className="p-4 bg-card border border-border/40 hover:border-border/80 rounded-xl transition-all duration-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        {getTargetBadge(item.target)}
                        {getPriorityBadge(item.priority)}
                      </div>
                      <h3 className="font-bold text-sm text-foreground leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* COLUMN 3: DONE */}
            <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-border/20">
              <div className="flex items-center justify-between border-b border-border/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <h2 className="font-bold text-base font-heading text-foreground">Concluído</h2>
                </div>
                <span className="text-xs font-bold text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full shrink-0">
                  {doneItems.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {doneItems.map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 0.04}>
                    <div className="p-4 bg-card border border-border/40 hover:border-border/80 rounded-xl transition-all duration-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        {getTargetBadge(item.target)}
                        {getPriorityBadge(item.priority)}
                      </div>
                      <h3 className="font-bold text-sm text-foreground leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
