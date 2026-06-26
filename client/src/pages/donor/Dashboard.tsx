import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  TrendingUp, 
  History as HistoryIcon, 
  ArrowRight, 
  DollarSign,
  Building2,
  Calendar,
  Loader2
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function DonorDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  
  // In a real scenario, we might have a specific endpoint for donor dashboard
  // For now, let's reuse some existing logic or mock some data if needed
  const { data: stats, isLoading } = useQuery({
    queryKey: ['donor-stats', user?.userId],
    queryFn: () => ({
        totalDonated: 1250.00,
        donationCount: 5,
        lastDonationDate: "2026-06-01",
        impactedLives: 12
    }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Bem-vindo, {user?.firstName || "Doador"}!</h1>
          <p className="text-muted-foreground">Obrigado por ajudar a ampliar o impacto social hoje.</p>
        </div>
        <Button 
            onClick={() => setLocation("/volunteer/ongs")}
            className="rounded-full shadow-lg shadow-primary/20"
        >
            Nova Doação
            <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Doado</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {stats?.totalDonated.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">+15% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-purple-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Vidas Impactadas</CardTitle>
            <Heart className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats?.impactedLives}</div>
            <p className="text-xs text-muted-foreground mt-1">Baseado nos projetos apoiados</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Doações Realizadas</CardTitle>
            <HistoryIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.donationCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Este ano</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-emerald-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Nível de Impacto</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Doador Prata</div>
            <p className="text-xs text-muted-foreground mt-1">Próximo nível: Doador Ouro</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Donations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doações Recentes</CardTitle>
            <CardDescription>Acompanhe o status dos seus últimos apoios.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Hortas Sustentáveis", amount: 250.00, date: "01/06/2026", status: "Confirmado" },
                { name: "Educação para Todos", amount: 500.00, date: "15/05/2026", status: "Confirmado" },
                { name: "Reflorestamento Ativo", amount: 100.00, date: "02/05/2026", status: "Confirmado" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">R$ {item.amount.toFixed(2)}</p>
                    <p className="text-xs text-emerald-600 font-medium">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-muted-foreground">
              Ver histórico completo
            </Button>
          </CardContent>
        </Card>

        {/* Suggested Causes */}
        <Card>
          <CardHeader>
            <CardTitle>Causas Recomendadas</CardTitle>
            <CardDescription>Projetos alinhados ao seu perfil.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
               <div className="group cursor-pointer">
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400" alt="Educação" className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-foreground">Educação</Badge>
                  </div>
                  <h4 className="font-bold text-sm">Escola Aberta Digital</h4>
                  <p className="text-xs text-muted-foreground mt-1">85% da meta atingida</p>
                  <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary w-[85%]" />
                  </div>
               </div>

               <div className="group cursor-pointer">
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" alt="Meio Ambiente" className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-foreground">Ambiental</Badge>
                  </div>
                  <h4 className="font-bold text-sm">Plantando o Amanhã</h4>
                  <p className="text-xs text-muted-foreground mt-1">40% da meta atingida</p>
                  <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary w-[40%]" />
                  </div>
               </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setLocation("/volunteer/ongs")}>
                Explorar Causas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
