import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  Heart, 
  Settings, 
  Bell, 
  TrendingUp,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import AppShell from "@/components/layouts/AppShell";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }
  }, [isAuthenticated, setLocation]);

  if (!user) return null;

  // Get display name based on user type
  const getDisplayName = () => {
    if (user.firstName) {
      return user.firstName;
    }
    return "Usuário";
  };

  const navItems = [
    { href: "/dashboard", label: "Início", icon: LayoutDashboard },
    { href: "/dashboard/financial", label: "Financeiro", icon: Wallet },
    { href: "/ong/volunteers", label: "Voluntários", icon: Users },
    { href: "/ong/projects", label: "Projetos", icon: Heart },
    { href: "/dashboard/settings", label: "Configurações", icon: Settings },
  ];

  const handleNavigation = (path: string) => {
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
      path: "/dashboard/stats"
    },
    {
      title: "Financeiro",
      description: "Doações e relatórios",
      icon: Wallet,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      hoverColor: "hover:bg-emerald-500/20",
      path: "/dashboard/financial"
    },
    {
      title: "Voluntários",
      description: "Gerenciar voluntários",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      hoverColor: "hover:bg-purple-500/20",
      path: "/dashboard/volunteers"
    },
    {
      title: "Projetos",
      description: "Projetos e campanhas",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      hoverColor: "hover:bg-rose-500/20",
      path: "/dashboard/projects"
    },
    {
      title: "Configurações",
      description: "Preferências do sistema",
      icon: Settings,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      hoverColor: "hover:bg-amber-500/20",
      path: "/dashboard/settings"
    }
  ];

  return (
    <AppShell navItems={navItems} title="Amplia">
          {/* Welcome Section */}
          <div className="space-y-2 mb-8">
            <h2 className="text-4xl font-display font-bold text-foreground">
              Olá, {getDisplayName()}! 👋
            </h2>
            <p className="text-lg text-muted-foreground">
              Bem-vindo de volta. Aqui está um resumo rápido do que você pode fazer.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Atividades Hoje</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">12</div>
                <p className="text-xs text-muted-foreground mt-1">+3 desde ontem</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Tarefas Pendentes</CardTitle>
                <Calendar className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">5</div>
                <p className="text-xs text-muted-foreground mt-1">2 urgentes</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Notificações</CardTitle>
                <Bell className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">8</div>
                <p className="text-xs text-muted-foreground mt-1">3 não lidas</p>
              </CardContent>
            </Card>
          </div>

          {/* Shortcuts Section */}
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground">Acesso Rápido</h3>
              <p className="text-muted-foreground">Navegue rapidamente para as áreas mais usadas do sistema</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shortcuts.map((shortcut) => {
                const Icon = shortcut.icon;
                return (
                  <Card 
                    key={shortcut.title}
                    className={`group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 ${shortcut.hoverColor}`}
                    onClick={() => handleNavigation(
                        shortcut.title === "Voluntários" ? "/ong/volunteers" : 
                        shortcut.title === "Projetos" ? "/ong/projects" : 
                        shortcut.path
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`h-12 w-12 rounded-xl ${shortcut.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-6 w-6 ${shortcut.color}`} />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
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
              <CardDescription>Últimas ações realizadas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Novo voluntário cadastrado</p>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Doação recebida - R$ 500,00</p>
                    <p className="text-xs text-muted-foreground">Há 5 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Projeto "Educação para Todos" atualizado</p>
                    <p className="text-xs text-muted-foreground">Ontem</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
    </AppShell>
  );
}
