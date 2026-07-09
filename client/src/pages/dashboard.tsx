import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  Heart, 
  Settings, 
  Bell, 
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import OngLayout from "@/components/layouts/OngLayout";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }
  }, [isAuthenticated, setLocation]);

  // Fetch real dashboard stats
  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ['ong-stats', user?.userId],
    queryFn: () => api.getDashboardStats(1), // Default/testing group ID 1
    enabled: !!user?.userId,
  });

  // Fetch recent donations to construct recent activities
  const { data: donationsPage } = useQuery({
    queryKey: ['ong-donations-recent', user?.userId],
    queryFn: () => api.getDonationsByGroup(1, 0, 5),
    enabled: !!user?.userId,
  });

  // Fetch recent volunteers to construct recent activities
  const { data: volunteersPage } = useQuery({
    queryKey: ['ong-volunteers-recent', user?.userId],
    queryFn: () => api.getVolunteersByGroup(1, 0, 5),
    enabled: !!user?.userId,
  });

  if (!user) return null;

  // Get display name based on user type
  const getDisplayName = () => {
    if (user.firstName) {
      return user.firstName;
    }
    return "Organização";
  };



  const handleNavigation = (path: string, disabled?: boolean) => {
    if (disabled) {
      toast.info("Esta funcionalidade estará disponível em breve!");
      return;
    }
    setLocation(path);
  };

  // Shortcut cards for main features
  const shortcuts = [
    {
      title: "Visão Geral",
      description: "Dashboard e estatísticas",
      icon: LayoutDashboard,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      hoverColor: "hover:bg-blue-500/20",
      path: "/ong/dashboard"
    },
    {
      title: "Financeiro",
      description: "Doações e relatórios",
      icon: Wallet,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      hoverColor: "hover:bg-emerald-500/20",
      path: "/ong/financial",
      disabled: true
    },
    {
      title: "Voluntários",
      description: "Gerenciar voluntários",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      hoverColor: "hover:bg-purple-500/20",
      path: "/ong/volunteers"
    },
    {
      title: "Projetos",
      description: "Projetos e campanhas",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      hoverColor: "hover:bg-rose-500/20",
      path: "/ong/projects"
    },
    {
      title: "Configurações",
      description: "Preferências do sistema",
      icon: Settings,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      hoverColor: "hover:bg-amber-500/20",
      path: "/ong/settings",
      disabled: true
    }
  ];

  // Combine and sort activities dynamically
  const getRecentActivities = () => {
    const list: any[] = [];

    if (donationsPage?.content) {
      donationsPage.content.forEach((d: any) => {
        list.push({
          id: `donation-${d.id}`,
          title: `Doação recebida - R$ ${d.amount ? d.amount.toFixed(2) : "0.00"}`,
          time: d.createdAt ? new Date(d.createdAt).toLocaleDateString("pt-BR") : "Recentemente",
          icon: Wallet,
          color: "text-emerald-500",
          bgColor: "bg-emerald-500/10",
          timestamp: d.createdAt ? new Date(d.createdAt).getTime() : 0
        });
      });
    }

    if (volunteersPage?.content) {
      volunteersPage.content.forEach((v: any) => {
        list.push({
          id: `volunteer-${v.guid}`,
          title: `Novo voluntário associado: ${v.firstName || ""} ${v.lastName || ""}`.trim(),
          time: "Recentemente",
          icon: Users,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          timestamp: 0
        });
      });
    }

    // Sort by timestamp if available
    return list.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  };

  const activities = getRecentActivities();

  return (
    <OngLayout>
      {/* Welcome Section */}
      <div className="space-y-2 mb-8">
        <h2 className="text-4xl font-display font-bold text-foreground">
          Olá, {getDisplayName()}! 👋
        </h2>
        <p className="text-lg text-muted-foreground">
          Bem-vindo de volta. Aqui está um resumo rápido da sua organização.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Arrecadado</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <div className="text-2xl font-bold text-foreground">
                R$ {statsData?.totalRaised ? statsData.totalRaised.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "0,00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Repasse líquido em conta</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Voluntários Associados</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold text-foreground">
                {statsData?.activeVolunteers || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Engajados em ações</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projetos Ativos</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold text-foreground">
                {statsData?.activeProjects || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Campanhas na plataforma</p>
          </CardContent>
        </Card>
      </div>

      {/* Shortcuts Section */}
      <div className="space-y-4 mb-8">
        <div>
          <h3 className="text-2xl font-display font-bold text-foreground">Acesso Rápido</h3>
          <p className="text-muted-foreground">Navegue rapidamente para as áreas do sistema</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((shortcut) => {
            const Icon = shortcut.icon;
            return (
              <Card 
                key={shortcut.title}
                className={`group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 ${
                  shortcut.disabled ? "opacity-55 cursor-not-allowed" : shortcut.hoverColor
                }`}
                onClick={() => handleNavigation(
                  shortcut.path,
                  shortcut.disabled
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 rounded-xl ${shortcut.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${shortcut.color}`} />
                    </div>
                    {shortcut.disabled ? (
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Em breve
                      </span>
                    ) : (
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold">{shortcut.title}</CardTitle>
                  <CardDescription className="text-base">{shortcut.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Últimas ações reais registradas na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((act) => {
                const ActIcon = act.icon;
                return (
                  <div key={act.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className={`h-10 w-10 rounded-full ${act.bgColor} flex items-center justify-center`}>
                      <ActIcon className={`h-5 w-5 ${act.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{act.title}</p>
                      <p className="text-xs text-muted-foreground">{act.time}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                Nenhuma atividade recente registrada para esta organização.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </OngLayout>
  );
}
