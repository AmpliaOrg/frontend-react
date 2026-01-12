import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, MapPin, Users, Target, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function VolunteerDashboard() {
  const { user } = useAuth();
  
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['volunteer-dashboard', user?.userId],
    queryFn: () => api.getVolunteerDashboard(user?.userId as string),
    enabled: !!user?.userId
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Olá, {dashboard?.myName || user?.email?.split('@')[0]}</h1>
          <p className="text-muted-foreground">Aqui está o resumo do seu impacto e novas oportunidades.</p>
        </div>
        <div className="flex gap-2">
            <Card className="bg-primary/10 border-none shadow-none">
                <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                        <ClockIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">Horas Doadas</p>
                        <p className="text-2xl font-bold text-primary">{dashboard?.myHours || 0}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Featured Editais */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-accent" />
                Editais Abertos
            </h2>
            <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ArrowRight className="w-4 h-4" />
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboard?.featuredEditais?.slice(0, 3).map((edital: any) => (
                <Card key={edital.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
                    <CardHeader className="pb-2">
                        <Badge variant="secondary" className="w-fit mb-2">{edital.type || "Voluntariado"}</Badge>
                        <CardTitle className="line-clamp-1">{edital.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{edital.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <CalendarDays className="w-4 h-4" />
                            <span>Até {new Date(edital.closeDate).toLocaleDateString()}</span>
                        </div>
                        <Button className="w-full" variant="outline">Inscrever-se</Button>
                    </CardContent>
                </Card>
            ))}
            {(!dashboard?.featuredEditais || dashboard.featuredEditais.length === 0) && (
                <div className="col-span-full text-center py-10 bg-muted/50 rounded-lg border border-dashed">
                    <p className="text-muted-foreground">Nenhum edital aberto no momento.</p>
                </div>
            )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Projetos em Destaque
            </h2>
            <Button variant="ghost" size="sm" className="gap-1">
                Explorar Projetos <ArrowRight className="w-4 h-4" />
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboard?.featuredProjects?.slice(0, 3).map((project: any) => (
                <Card key={project.guid} className="group overflow-hidden">
                    <div className="h-32 bg-secondary/30 group-hover:bg-secondary/50 transition-colors flex items-center justify-center">
                        <Users className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Meta: R$ {project.goalAmount}</span>
                                <span className="text-primary font-medium">{project.progressPercentage}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary rounded-full transition-all duration-500"
                                    style={{ width: `${project.progressPercentage}%` }}
                                />
                            </div>
                            <Button className="w-full mt-4">Apoiar</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      {/* Global Goals (Metas) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-yellow-400" />
                    Metas Globais
                </CardTitle>
                <CardDescription className="text-slate-300">
                    Nossas metas coletivas para este ano.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {dashboard?.globalGoals?.map((goal: any) => (
                    <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="font-medium">{goal.title}</span>
                            <span className="text-sm text-slate-300">
                                {goal.currentCount || 0} / {goal.targetCount || 'Infinito'}
                            </span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min(100, ((goal.currentCount || 0) / (goal.targetCount || 1)) * 100)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* Featured NGOs */}
        <div>
             <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                ONGs Parceiras
            </h2>
            <div className="space-y-3">
                {dashboard?.featuredNgso?.slice(0, 4).map((ong: any) => (
                    <div key={ong.id} className="flex items-center gap-4 p-3 bg-card rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center font-bold text-primary">
                            {ong.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-semibold">{ong.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{ong.description || "Organização sem fins lucrativos"}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">Perfil</Button>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}

function ClockIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
}

function FileTextIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </svg>
    )
}

function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Skeleton className="h-24 w-48" />
            </div>
            <div className="grid grid-cols-3 gap-6">
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
            </div>
        </div>
    )
}
