import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Loader2, ArrowLeft, Heart, Globe, Mail, Phone, Target } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import DonationModal from "@/components/DonationModal";

export default function VolunteerOngDetail() {
  const [location, setLocation] = useLocation();
  const prefix = location.startsWith("/donor") ? "/donor" : "/volunteer";
  const { id } = useParams();
  const [selectedProject, setSelectedProject] = useState<{ guid: string; name: string; groupId: number } | null>(null);

  const { data: ong, isLoading } = useQuery({
    queryKey: [`/api/ongs/${id}`],
    queryFn: () => api.getOngById(id!),
    enabled: !!id,
  });

  // Query active projects for this ONG
  const { data: projectsPage, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['ong-detail-projects', id],
    queryFn: () => api.getProjectsByStatus(Number(id), "ACTIVE", 0, 10),
    enabled: !!id,
  });

  const projects = Array.isArray(projectsPage) ? projectsPage : (projectsPage?.content || []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!ong) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">ONG não encontrada.</p>
        <Button variant="link" onClick={() => setLocation(`${prefix}/ongs`)}>
          Voltar para a lista
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <Button 
        variant="ghost" 
        onClick={() => setLocation(`${prefix}/ongs`)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para lista
      </Button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Card */}
        <Card className="w-full md:w-80 shrink-0">
          <CardHeader className="text-center">
            <div className="mx-auto h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Building2 className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl">{ong.organizationName || ong.name}</CardTitle>
            <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
              <MapPin className="mr-1 h-3 w-3" />
              {ong.address || "Brasil"}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              <Heart className="mr-2 h-4 w-4" />
              Seguir ONG
            </Button>
            
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-primary truncate">www.{ong.organizationName?.toLowerCase().replace(/\s/g, '') || "ong"}.org.br</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{ong.email || "contato@ong.org.br"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{ong.phone || "(00) 0000-0000"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="flex-1 space-y-8">
          <section className="space-y-4">
            <h3 className="text-2xl font-bold font-display">Sobre a Organização</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {ong.bio || "Esta organização é dedicada a criar impacto social positivo através de projetos sustentáveis e engajamento da comunidade. Nossa missão é ampliar as oportunidades para todos."}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold font-display">Missão e Valores</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-muted/30 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Transparência</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Garantimos que cada recurso seja utilizado de forma eficiente e rastreável.
                </CardContent>
              </Card>
              <Card className="bg-muted/30 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Impacto Social</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Focamos em resultados reais que transformam a vida das pessoas atendidas.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Active Projects and Campaigns */}
          <section className="space-y-4 pt-6 border-t border-border/40">
            <h3 className="text-2xl font-bold font-display flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Projetos e Campanhas Ativas
            </h3>
            {isLoadingProjects ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project: any) => {
                  const progress = Math.min(
                    100,
                    Math.round(((project.currentAmount || 0) / (project.goalAmount || 1)) * 100)
                  );
                  return (
                    <Card key={project.guid} className="border border-border/60 hover:border-primary/45 transition-colors overflow-hidden flex flex-col justify-between">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold line-clamp-1">{project.name}</CardTitle>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {project.description || "Sem descrição disponível."}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <div className="space-y-1">
                          <div className="flex justify-between text-2xs text-muted-foreground font-semibold">
                            <span>Meta: R$ {project.goalAmount.toLocaleString("pt-BR")}</span>
                            <span className="text-primary">{progress}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedProject({ guid: project.guid, name: project.name, groupId: project.groupId })}
                          className="w-full gap-1.5 text-xs font-bold cursor-pointer"
                        >
                          <Heart className="h-3.5 w-3.5 fill-current" />
                          Doar via Pix
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Esta organização não possui projetos ativos no momento.</p>
            )}
          </section>
        </div>
      </div>

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

