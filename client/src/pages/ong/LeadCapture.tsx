import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Heart, 
  ArrowLeft, 
  BadgeCheck, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Phone, 
  FileText,
  Target,
  Sparkles,
  Users,
  TrendingUp,
  ShieldCheck,
  Percent
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

// CNPJ regex validation (accepts formatted or unformatted)
const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
// Phone regex validation (accepts various formats)
const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const leadSchema = z.object({
  name: z.string().min(3, "Nome da organização deve ter pelo menos 3 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  cnpj: z.string().refine((val) => cnpjRegex.test(val), "CNPJ inválido (ex: 00.000.000/0000-00)"),
  phone: z.string().refine((val) => phoneRegex.test(val), "Telefone inválido (ex: (11) 99999-9999)"),
});

type LeadForm = z.infer<typeof leadSchema>;

export default function LeadCapture() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadForm) => {
    setIsSubmitting(true);
    try {
      // Call mock/real API client
      const response = await api.createOngLead(data);
      if (response.success) {
        setIsSuccess(true);
        toast({
          title: "Interesse registrado!",
          description: "Obrigado por se cadastrar na Amplia.",
        });
        reset();
      }
    } catch (error: any) {
      toast({
        title: "Erro ao registrar interesse",
        description: error.message || "Algo deu errado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="group rounded-full hover:bg-muted/80"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o início
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Proposta de Valor e Mockup */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground leading-[1.15]">
                O impacto da sua ONG, <span className="text-primary relative inline-block">ampliado.<span className="absolute bottom-1 left-0 w-full h-[4px] bg-primary/30 rounded-full"></span></span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[620px]">
                A Amplia está criando um ecossistema projetado para simplificar a gestão de projetos, aproximar patrocinadores e automatizar o voluntariado.
              </p>
            </div>

            {/* Benefícios em lista */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground">Doações Rastreáveis</h4>
                  <p className="text-sm text-muted-foreground mt-1">Ferramentas de prestação de contas que aumentam a confiança dos doadores em até 80%.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground">Mini Editais</h4>
                  <p className="text-sm text-muted-foreground mt-1">Publique convites para voluntários focando nas competências que sua equipe precisa.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground">Confiança para Doadores</h4>
                  <p className="text-sm text-muted-foreground mt-1">Fortaleça a relação com seus apoiadores oferecendo total transparência e relatórios dinâmicos.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Percent className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground">Taxas Baixíssimas</h4>
                  <p className="text-sm text-muted-foreground mt-1">Repasse financeiro com as taxas mais competitivas para garantir que mais recursos cheguem à causa.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-5">
            <Card className="shadow-2xl border-2 border-primary/10 overflow-hidden relative">
              {/* Decorative gradient top bar */}
              <div className="h-2 w-full bg-gradient-to-r from-primary via-emerald-500 to-primary/80" />
              
              <CardHeader className="space-y-2 p-6 md:p-8">
                <CardTitle className="text-2xl font-bold font-display">Quero fazer parte</CardTitle>
                <CardDescription className="text-sm">
                  Preencha o formulário abaixo para garantir sua vaga na lista de acesso antecipado e receber novidades do desenvolvimento.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 md:p-8 pt-0">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit(onSubmit)} 
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-1.5">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          Nome da Organização *
                        </Label>
                        <Input
                          id="name"
                          placeholder="ONG Amor e Vida"
                          {...register("name")}
                          className={`rounded-xl h-11 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-1.5">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          E-mail de Contato *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="contato@ong.org.br"
                          {...register("email")}
                          className={`rounded-xl h-11 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="cnpj" className="text-sm font-semibold flex items-center gap-1.5">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            CNPJ *
                          </Label>
                          <Input
                            id="cnpj"
                            placeholder="00.000.000/0000-00"
                            {...register("cnpj")}
                            className={`rounded-xl h-11 ${errors.cnpj ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.cnpj && (
                            <p className="text-xs text-red-500 mt-1">{errors.cnpj.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-1.5">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            Telefone *
                          </Label>
                          <Input
                            id="phone"
                            placeholder="(11) 99999-9999"
                            {...register("phone")}
                            className={`rounded-xl h-11 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/45 mt-4" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Me avise quando estiver pronto"}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display text-foreground">Inscrição Confirmada!</h3>
                        <p className="text-sm text-muted-foreground">
                          Obrigado pelo seu interesse. A sua ONG agora faz parte da nossa lista exclusiva de acesso antecipado.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/40 text-xs text-muted-foreground text-left leading-relaxed">
                        Entraremos em contato no e-mail fornecido para validar sua conta assim que a fase beta da Amplia for iniciada. Fique ligado!
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsSuccess(false)}
                        className="w-full h-11 rounded-xl"
                      >
                        Cadastrar outra ONG
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
