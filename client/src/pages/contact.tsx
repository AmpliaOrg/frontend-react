import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  Mail, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  User, 
  Sparkles,
  HelpCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/components/ScrollReveal";


const contactSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  subject: z.string().min(4, "Assunto deve ter pelo menos 4 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactUs() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Contact message submitted:", data);
      setIsSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos o contato. Responderemos o mais breve possível.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar a mensagem no momento.",
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
          {/* Left Column: Proposta e Link de E-mail */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <HelpCircle className="h-4 w-4" />
                <span>Central de Atendimento</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground leading-[1.15]">
                Como podemos <span className="text-primary relative inline-block">ajudar?<span className="absolute bottom-1 left-0 w-full h-[4px] bg-primary/30 rounded-full"></span></span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[550px]">
                Quer propor parcerias, relatar bugs, solicitar suporte ou dar feedback? Escolha um canal e fale conosco.
              </p>
            </div>

            {/* Premium mailto link card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4 relative overflow-hidden"
            >
              <div className="absolute right-4 bottom-4 text-primary/10">
                <Mail className="h-40 w-40 -rotate-12 translate-y-12 translate-x-4" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1.5 relative z-10">
                <h3 className="text-lg font-bold text-foreground">E-mail Direto</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Prefere usar seu cliente de e-mail padrão? Clique no link abaixo para nos escrever diretamente.
                </p>
              </div>
              <div className="relative z-10 pt-2">
                <a 
                  href="mailto:pf.lucasmoura@gmail.com?subject=Contato%20Plataforma%20Amplia"
                  className="inline-flex items-center justify-center font-semibold text-primary hover:text-primary/80 transition-colors gap-2 group text-base"
                >
                  pf.lucasmoura@gmail.com
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>

            {/* Perguntas Frequentes rápidas */}
            <div className="space-y-4 pt-4 border-t border-border/40">
              <h4 className="font-bold text-foreground">Respostas Rápidas</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold">Quanto tempo demora o retorno?</p>
                  <p className="text-muted-foreground mt-0.5">Nossa equipe costuma responder a todas as mensagens de e-mail em até 24 horas úteis.</p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Como funciona a parceria corporativa (ESG)?</p>
                  <p className="text-muted-foreground mt-0.5">Se a sua empresa deseja patrocinar projetos, selecione 'Parceria' no assunto ou nos escreva diretamente.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={0.15}>
              <Card className="shadow-2xl border border-border overflow-hidden relative">
                <div className="h-2 w-full bg-primary" />
              
              <CardHeader className="space-y-2 p-6 md:p-8">
                <CardTitle className="text-2xl font-bold font-display">Envie uma Mensagem</CardTitle>
                <CardDescription className="text-sm">
                  Se preferir usar o formulário da plataforma, preencha os dados abaixo e envie.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 md:p-8 pt-0">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form 
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit(onSubmit)} 
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-1.5">
                            <User className="h-4 w-4 text-muted-foreground" />
                            Seu Nome *
                          </Label>
                          <Input
                            id="name"
                            placeholder="João Silva"
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
                            placeholder="seu@email.com"
                            {...register("email")}
                            className={`rounded-xl h-11 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-semibold flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-muted-foreground" />
                          Assunto *
                        </Label>
                        <Input
                          id="subject"
                          placeholder="Dúvida, Parceria, Bugs, etc."
                          {...register("subject")}
                          className={`rounded-xl h-11 ${errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        {errors.subject && (
                          <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-semibold flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          Mensagem *
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Escreva detalhadamente o motivo do seu contato..."
                          {...register("message")}
                          rows={5}
                          className={`rounded-xl ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                        {errors.message && (
                          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/45 mt-4" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="contact-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display text-foreground">Mensagem Enviada!</h3>
                        <p className="text-sm text-muted-foreground">
                          Agradecemos o contato. Retornaremos sua mensagem em breve no e-mail informado.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsSuccess(false)}
                        className="w-full h-11 rounded-xl"
                      >
                        Enviar outra mensagem
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
