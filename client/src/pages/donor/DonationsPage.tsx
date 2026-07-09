import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, History, ExternalLink, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function DonorDonationsPage() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  // Fetch real donation history
  const { data: donationsPage, isLoading: isLoadingDonations, error: donationsError } = useQuery({
    queryKey: ['donor-my-donations', user?.userId],
    queryFn: () => api.getMyDonations(0, 50),
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

  const donations = donationsPage?.content || [];

  const handleOpenCheckout = async (donationGuid: string) => {
    setCheckoutLoading(donationGuid);
    try {
      const res = await api.createCheckout(donationGuid);
      if (res.checkoutUrl) {
        toast.success("Redirecionando para o checkout Pix...");
        window.location.href = res.checkoutUrl;
      } else {
        toast.error("Não foi possível gerar o link de pagamento.");
      }
    } catch (err: any) {
      console.error("Checkout creation failed:", err);
      toast.error(err.message || "Erro ao gerar checkout de pagamento.");
    } finally {
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Minhas Doações
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Histórico consolidado de todas as suas contribuições financeiras na plataforma.
        </p>
      </div>

      {/* Donation History List */}
      <Card className="border border-border/60 shadow-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-2.5 pb-4 border-b border-border/40">
          <History className="h-5 w-5 text-primary" />
          <div>
            <CardTitle className="text-lg font-bold">Listagem Completa</CardTitle>
            <CardDescription className="text-xs">Consulte e verifique os status das transações financeiras realizadas.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoadingDonations ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : donations.length > 0 ? (
            <div className="space-y-3">
              {donations.map((donation: any) => {
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

                const isPending = donation.status === "PENDING";
                const isLoadingThis = checkoutLoading === donation.guid;

                return (
                  <div 
                    key={donation.guid} 
                    className="flex items-center justify-between p-4 bg-muted/20 border border-border/40 hover:border-border/80 rounded-xl transition-all duration-200"
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
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="font-extrabold text-primary text-base">
                          R$ {donation.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      {getStatusBadge(donation.status)}
                      <Button
                        size="sm"
                        variant={isPending ? "default" : "outline"}
                        disabled={!isPending || isLoadingThis}
                        onClick={() => handleOpenCheckout(donation.guid)}
                        className="gap-1.5 text-xs font-semibold cursor-pointer"
                      >
                        {isLoadingThis ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <ExternalLink className="h-3.5 w-3.5" />
                        )}
                        {isPending ? "Pagar" : "Pago"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/10 rounded-2xl border border-dashed border-border/30">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground/35 mb-3" />
              <h3 className="text-lg font-bold text-foreground">Nenhuma doação encontrada</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1">
                Você ainda não realizou nenhuma doação. Apoie um projeto ativo no dashboard para começar!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
