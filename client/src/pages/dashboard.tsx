import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  Heart, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  Download,
  Calendar,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { api, type DashboardStats } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import logo from "@assets/Amplia_1764618105352.png";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }

    // Mock group ID - in production, this would come from user data
    const groupId = 1;

    api.getDashboardStats(groupId)
      .then(setStats)
      .catch((error) => {
        toast({
          title: "Erro ao carregar dados",
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, setLocation, toast]);

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  if (!user) return null;

  // Mock data for chart (would come from API in production)
  const financialData = [
    { name: "Jan", valor: 4000 },
    { name: "Fev", valor: 3000 },
    { name: "Mar", valor: 2000 },
    { name: "Abr", valor: 2780 },
    { name: "Mai", valor: 1890 },
    { name: "Jun", valor: 2390 },
    { name: "Jul", valor: 3490 },
    { name: "Ago", valor: 5200 },
    { name: "Set", valor: stats?.totalRaised || 8400 },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col fixed h-full z-10">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-border/40">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-primary/10 p-1">
            <img src={logo} alt="Amplia Logo" className="h-full w-full object-contain" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">Amplia</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start text-base font-medium">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Visão Geral
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base font-medium">
            <Wallet className="mr-3 h-5 w-5" />
            Financeiro
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base font-medium">
            <Users className="mr-3 h-5 w-5" />
            Voluntários
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base font-medium">
            <Heart className="mr-3 h-5 w-5" />
            Projetos
          </Button>
          <Separator className="my-4 opacity-50"/>
          <Button variant="ghost" className="w-full justify-start text-base font-medium text-muted-foreground">
            <Settings className="mr-3 h-5 w-5" />
            Configurações
          </Button>
        </nav>

        <div className="p-4 border-t border-border/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/50 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground truncate">{user.role}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <header className="h-20 border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-0 z-20 px-8 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-foreground">Visão Geral</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                className="h-10 rounded-full border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64" 
                placeholder="Pesquisar..." 
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background"></span>
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
          
          {/* STATS CARDS */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Arrecadado</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {isLoading ? "..." : `R$ ${stats?.totalRaised.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}`}
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-emerald-600 flex items-center font-medium mr-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +20.1%
                  </span> que o mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Voluntários Ativos</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {isLoading ? "..." : stats?.activeVolunteers || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.newVolunteersThisWeek || 0} novos essa semana
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Projetos Ativos</CardTitle>
                <Heart className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {isLoading ? "..." : stats?.activeProjects || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.totalDonations || 0} doações recebidas
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Horas Doadas</CardTitle>
                <Calendar className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {isLoading ? "..." : `${stats?.totalHoursDonated || 0}h`}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Total acumulado em 2025</p>
              </CardContent>
            </Card>
          </div>

          {/* CHART */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Entrada de Capital</CardTitle>
                  <CardDescription>Receita de doações nos últimos 9 meses</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Download className="h-3.5 w-3.5" /> Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialData}>
                    <defs>
                      <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `R$${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="valor" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorValor)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
