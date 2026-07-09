import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Target, 
  Loader2,
  Users,
  History
} from "lucide-react";
import DonationModal from "@/components/DonationModal";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function DonorDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedProject, setSelectedProject] = useState<{ guid: string; name: string; groupId: number } | null>(null);

  // Fetch real projects dynamically
  const { data: projectsPage, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['donor-projects', user?.userId],
    queryFn: () => api.getProjectsByGroup(1, 0, 10), // Default group ID 1
    enabled: !!user?.userId,
  });

  // Fetch real donation history
  const { data: donationsPage, isLoading: isLoadingDonations, error: donationsError } = useQuery({
    queryKey: ['donor-my-donations', user?.userId],
    queryFn: () => api.getMyDonations(0, 20),
    enabled: !!user?.userId,
    retry: false
  });

  // Handle errors (specifically 401 Unauthorized)
  useEffect(() => {
    if (donationsError) {
      const errMsg = donationsError.message || '';
      if (errMsg.includes('401') || errMsg.includes('Unauthorized')) {
        toast.error("Sessão expirada. Por favor, faça login novamente.");
        logout();
        setLocation("/login");
      } else {
        toast.error("Erro ao carregar histórico de doações.");
      }
    }
  }, [donationsError, logout, setLocation]);

  const projects = projectsPage?.content || [];
  const donations = donationsPage?.content || [];

  return (
    <div className="space-y-12 pb-10">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Bem-vindo, {user?.firstName || "Doador"}! 👋
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Obrigado por apoiar a Amplia. Escolha um dos projetos ativos abaixo para realizar sua doação direta e segura via Pix (AbacatePay).
        </p>
      </div>

      {/* Projects List */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold font-heading text-foreground">Projetos Ativos</h2>
        </div>

        {isLoadingProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-32 w-full" />
                <CardHeader className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => {
              const progress = Math.min(
                100,
                Math.round(((project.currentAmount || 0) / (project.goalAmount || 1)) * 100)
              );
              return (
                <Card key={project.guid} className="group overflow-hidden border border-border/60 hover:border-primary/40 transition-all duration-300">
                  <div className="h-28 bg-muted/40 group-hover:bg-muted/60 transition-colors flex items-center justify-center border-b border-border/30">
                    <Users className="w-10 h-10 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{project.description || "Sem descrição disponível."}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Meta: R$ {project.goalAmount?.toLocaleString("pt-BR") || "0"}</span>
                        <span className="text-primary font-bold">{progress}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={() => setSelectedProject({ guid: project.guid!, name: project.name, groupId: project.groupId })}
                      className="w-full gap-2 cursor-pointer font-semibold"
                    >
                      <Heart className="h-4 w-4" />
                      Apoiar via Pix
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/20 rounded-3xl border border-dashed border-border/40">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground/45 mb-3" />
            <h3 className="text-lg font-bold text-foreground">Nenhum projeto ativo no momento</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1">
              Volte mais tarde para ver novos projetos cadastrados pelas ONGs parceiras.
            </p>
          </div>
        )}
      </section>

      {/* Donation History Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
          <History className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold font-heading text-foreground">Histórico de Doações</h2>
        </div>

        {isLoadingDonations ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : donations.length > 0 ? (
          <div className="space-y-3">
            {donations.map((donation: any) => {
              // Status formatting
              const getStatusBadge = (status: string) => {
                switch (status) {
                  case "CONFIRMED":
                    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">Confirmado</span>;
                  case "PENDING":
                    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-500 uppercase tracking-wider">Pendente</span>;
                  case "FAILED":
                    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-rose-500/10 text-rose-500 uppercase tracking-wider">Falhou</span>;
                  case "REFUNDED":
                    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-slate-500/10 text-slate-500 uppercase tracking-wider">Reembolsado</span>;
                  default:
                    return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-slate-500/10 text-slate-500 uppercase tracking-wider">{status}</span>;
                }
              };

              const donationDateStr = donation.donationDate || donation.createdAt;
              const formattedDate = donationDateStr 
                ? new Date(donationDateStr).toLocaleString("pt-BR") 
                : "Recentemente";

              return (
                <div 
                  key={donation.guid} 
                  className="flex items-center justify-between p-4 bg-card border border-border/60 hover:border-border rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Heart className="h-5 w-5 fill-primary/15" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        {donation.notes || "Doação para projeto social"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Realizada em: {formattedDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <div>
                      <p className="font-extrabold text-primary text-base">
                        R$ {donation.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    {getStatusBadge(donation.status)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-3xl border border-dashed border-border/40">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground/35 mb-3" />
            <h3 className="text-lg font-bold text-foreground">Nenhuma doação encontrada</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1">
              Você ainda não realizou nenhuma doação. Apoie um projeto ativo acima para começar!
            </p>
          </div>
        )}
      </section>

      {/* Donation Modal Trigger */}
      {selectedProject && (
        <DonationModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          projectGuid={selectedProject.guid}
          projectName={selectedProject.name}
          groupId={selectedProject.groupId}
        />
      )}
    </div>
  );
}
