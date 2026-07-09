import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, CreditCard, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  projectGuid?: string;
  projectName: string;
}

export default function DonationModal({ isOpen, onClose, groupId, projectGuid, projectName }: DonationModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  // Form states
  const [amount, setAmount] = useState<string>("50");
  const [donorName, setDonorName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-fill user name on mount/open
  useEffect(() => {
    if (isOpen && user) {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
      setDonorName(fullName || user.email.split("@")[0]);
      setAmount("50");
      setNotes("");
      setErrorMessage(null);
    }
  }, [isOpen, user]);

  const currentRole = user?.role?.toUpperCase();
  const isOng = currentRole === "ONG" || currentRole === "ROLE_ONG";

  // Map user role to backend DonationType enum (INDIVIDUAL = Pessoa Física, CORPORATE = Pessoa Jurídica)
  const getDonorType = (): "INDIVIDUAL" | "CORPORATE" => {
    if (currentRole === "COMPANY" || currentRole === "ROLE_COMPANY") {
      return "CORPORATE";
    }
    return "INDIVIDUAL";
  };

  const handlePresetClick = (val: string) => {
    setAmount(val);
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Por favor, insira um valor maior que zero.");
      return;
    }

    if (!donorName.trim()) {
      setErrorMessage("O nome do doador é obrigatório.");
      return;
    }

    setIsLoading(true);

    try {
      const donationPayload = {
        amount: parsedAmount,
        donorName: donorName.trim(),
        donorType: getDonorType(),
        groupId: groupId,
        projectGuid: projectGuid || undefined,
        notes: notes.trim() || undefined,
      };

      const res = await api.createDonation(donationPayload);
      
      if (res.checkoutUrl) {
        toast({
          title: "Doação Gerada com Sucesso!",
          description: "Redirecionando para o ambiente seguro do Pix (AbacatePay)...",
        });
        window.location.href = res.checkoutUrl;
      } else {
        toast({
          title: "Doação Registrada com Sucesso!",
          description: `Sua doação de R$ ${parsedAmount.toFixed(2)} foi criada. Status: ${res.status}.`,
        });
        onClose();
      }
    } catch (err: any) {
      console.error("Donation creation failed:", err);
      setErrorMessage(err.message || "Erro na integração com o gateway de pagamentos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Apoiar Projeto
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Você está doando para o projeto <strong className="text-foreground">{projectName}</strong>.
          </DialogDescription>
        </DialogHeader>

        {isOng ? (
          <div className="py-4 space-y-4">
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive rounded-xl">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-semibold">Acesso Bloqueado</AlertTitle>
              <AlertDescription className="text-sm mt-1 leading-normal">
                Organizações não podem realizar doações, apenas receber fundos. Por favor, acesse com uma conta de doador ou voluntário.
              </AlertDescription>
            </Alert>
            <DialogFooter>
              <Button onClick={onClose} className="w-full rounded-xl">
                Fechar
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-5 py-2">
            {errorMessage && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive rounded-xl py-3">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">Valores recomendados</label>
              <div className="grid grid-cols-4 gap-2">
                {["20", "50", "100", "200"].map((val) => (
                  <Button
                    key={val}
                    type="button"
                    variant={amount === val ? "default" : "outline"}
                    onClick={() => handlePresetClick(val)}
                    className="rounded-xl h-11 font-bold text-sm"
                  >
                    R$ {val}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">Outro Valor (R$)</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="0,00"
                  className="pl-9 rounded-xl h-11 font-medium text-base"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Donor Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">Nome Completo do Doador</label>
              <Input
                type="text"
                placeholder="Insira o nome para o recibo"
                className="rounded-xl h-11 text-sm"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                disabled={isLoading}
                maxLength={255}
                required
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">Mensagem de apoio (opcional)</label>
              <Textarea
                placeholder="Envie uma mensagem de carinho ou observação..."
                className="rounded-xl min-h-[80px] text-sm resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isLoading}
                maxLength={1000}
              />
            </div>

            <DialogFooter className="pt-2">
              <div className="flex gap-2 w-full flex-col sm:flex-row">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="rounded-xl w-full sm:w-1/3 order-last sm:order-first"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl w-full sm:w-2/3 bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-semibold gap-2 shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Gerando Pix...
                    </>
                  ) : (
                    <>
                      Confirmar Doação (Pix)
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
