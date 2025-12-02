import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  Heart, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Download,
  Calendar,
  MoreHorizontal
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
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import logo from "@assets/Amplia_1764618105352.png";
import volunteer1 from "@assets/generated_images/volunteer_portrait.png";

// Mock Data
const financialData = [
  { name: "Jan", valor: 4000 },
  { name: "Fev", valor: 3000 },
  { name: "Mar", valor: 2000 },
  { name: "Abr", valor: 2780 },
  { name: "Mai", valor: 1890 },
  { name: "Jun", valor: 2390 },
  { name: "Jul", valor: 3490 },
  { name: "Ago", valor: 5200 },
  { name: "Set", valor: 8400 },
];

const topDonors = [
  { id: 1, name: "Empresa Verde Ltda", amount: "R$ 5.000,00", date: "Hoje, 14:30", status: "Confirmado", type: "Corporativo" },
  { id: 2, name: "João da Silva", amount: "R$ 250,00", date: "Ontem, 09:15", status: "Confirmado", type: "Individual" },
  { id: 3, name: "Maria Oliveira", amount: "R$ 150,00", date: "29 Set, 18:20", status: "Confirmado", type: "Individual" },
  { id: 4, name: "Tech Solutions", amount: "R$ 2.000,00", date: "28 Set, 11:00", status: "Pendente", type: "Corporativo" },
  { id: 5, name: "Pedro Santos", amount: "R$ 50,00", date: "28 Set, 10:45", status: "Confirmado", type: "Individual" },
];

const volunteers = [
  { id: 1, name: "Lucas Moura", role: "Assistente de Horta", hours: 12, status: "Ativo", avatar: volunteer1 },
  { id: 2, name: "Ana Clara", role: "Designer Gráfico", hours: 8, status: "Ativo", avatar: null },
  { id: 3, name: "Roberto Campos", role: "Educador Ambiental", hours: 24, status: "Ativo", avatar: null },
  { id: 4, name: "Julia Costa", role: "Fotógrafa", hours: 0, status: "Pendente", avatar: null },
];

export default function Dashboard() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("visao-geral");

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
          <Button variant={activeTab === "visao-geral" ? "secondary" : "ghost"} className="w-full justify-start text-base font-medium" onClick={() => setActiveTab("visao-geral")}>
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Visão Geral
          </Button>
          <Button variant={activeTab === "financeiro" ? "secondary" : "ghost"} className="w-full justify-start text-base font-medium" onClick={() => setActiveTab("financeiro")}>
            <Wallet className="mr-3 h-5 w-5" />
            Financeiro
          </Button>
          <Button variant={activeTab === "voluntarios" ? "secondary" : "ghost"} className="w-full justify-start text-base font-medium" onClick={() => setActiveTab("voluntarios")}>
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
          <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/50">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              AA
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">AgroAjuda</p>
              <p className="text-xs text-muted-foreground truncate">ong@agroajuda.org</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <header className="h-20 border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-0 z-20 px-8 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {activeTab === "visao-geral" && "Visão Geral"}
            {activeTab === "financeiro" && "Gestão Financeira"}
            {activeTab === "voluntarios" && "Painel de Voluntários"}
          </h1>
          
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
          
          {/* --- STATS CARDS --- */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Arrecadado</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">R$ 14.250,00</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-emerald-600 flex items-center font-medium mr-1"><TrendingUp className="h-3 w-3 mr-1" /> +20.1%</span> que o mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Voluntários Ativos</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">48</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-emerald-600 flex items-center font-medium mr-1"><ArrowUpRight className="h-3 w-3 mr-1" /> +4</span> novos essa semana
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Meta do Projeto</CardTitle>
                <Heart className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">56%</div>
                <div className="h-2 w-full bg-muted rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-primary w-[56%]"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Horas Doadas</CardTitle>
                <Calendar className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">1.240h</div>
                <p className="text-xs text-muted-foreground mt-1">Total acumulado em 2025</p>
              </CardContent>
            </Card>
          </div>

          {/* --- CHARTS & LISTS SECTION --- */}
          <div className="grid gap-6 lg:grid-cols-7">
            
            {/* Financial Chart */}
            <Card className="lg:col-span-4 shadow-sm">
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

            {/* Top Donations */}
            <Card className="lg:col-span-3 shadow-sm">
              <CardHeader>
                <CardTitle>Top Doações Recentes</CardTitle>
                <CardDescription>Últimas contribuições confirmadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topDonors.map((donor) => (
                    <div key={donor.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarFallback className={donor.type === "Corporativo" ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary"}>
                            {donor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{donor.name}</p>
                          <p className="text-xs text-muted-foreground">{donor.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-bold text-sm">{donor.amount}</span>
                        <Badge variant="secondary" className="text-[10px] h-5 px-2 font-normal bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                          {donor.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- VOLUNTEER PANEL --- */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Painel de Voluntários</CardTitle>
                    <CardDescription>Gerencie sua equipe de impacto</CardDescription>
                  </div>
                  <Button size="sm">Novo Edital</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground px-4 py-2 uppercase tracking-wider">
                    <div className="col-span-5">Voluntário</div>
                    <div className="col-span-3">Função</div>
                    <div className="col-span-2 text-center">Horas</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  <div className="space-y-2">
                    {volunteers.map((volunteer) => (
                      <div key={volunteer.id} className="grid grid-cols-12 items-center bg-muted/20 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={volunteer.avatar || undefined} />
                            <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{volunteer.name}</span>
                        </div>
                        <div className="col-span-3 text-sm text-muted-foreground">
                          {volunteer.role}
                        </div>
                        <div className="col-span-2 text-center">
                          <Badge variant="outline" className="font-mono">{volunteer.hours}h</Badge>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Badge variant={volunteer.status === "Ativo" ? "default" : "secondary"} className={volunteer.status === "Ativo" ? "bg-primary/15 text-primary hover:bg-primary/25 shadow-none" : ""}>
                            {volunteer.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions / Mini Stats */}
            <Card className="shadow-sm bg-primary text-primary-foreground border-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
              
              <CardHeader>
                <CardTitle className="text-white">Precisa de ajuda?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Abra um novo mini edital para atrair talentos específicos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Vagas Abertas</span>
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <p className="text-xs opacity-80">Designer, Agrônomo, Social Media</p>
                </div>
                <Button variant="secondary" className="w-full text-primary bg-white hover:bg-white/90 font-semibold shadow-lg">
                  Criar Vaga
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
