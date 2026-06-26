import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  Award,
  Hourglass,
  Sparkles,
  Compass,
  Clock
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function VolunteerInterest() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            className="group rounded-full hover:bg-muted/80"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o início
          </Button>
        </div>

        <div className="space-y-16 text-center">
          {/* Header Section */}
          <div className="space-y-6 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-foreground leading-[1.15]">
              Transforme sua energia em <span className="text-primary relative inline-block">impacto real.<span className="absolute bottom-1 left-0 w-full h-[4px] bg-primary/30 rounded-full"></span></span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Conecte-se com causas que precisam do seu talento. Na Amplia, cada hora de dedicação conta para a sua evolução pessoal, acadêmica e profissional.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-6 sm:grid-cols-2 text-left max-w-3xl mx-auto">
            <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-lg text-foreground">Horas Complementares</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Valide suas horas de voluntariado exigidas pela sua faculdade com total segurança e relatórios detalhados.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-lg text-foreground">Experiências Reais</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aplique seus conhecimentos acadêmicos em projetos sociais reais e enriqueça seu portfólio profissional com experiências práticas.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-lg text-foreground">Impacto Social Direto</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Veja os frutos do seu trabalho em tempo real, acompanhando a evolução dos projetos que você escolheu apoiar.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/80 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-lg text-foreground">Certificados Válidos</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Receba certificados digitais oficiais contendo chaves exclusivas de verificação e autenticidade rápidas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Banner Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border border-primary/20 bg-primary/5 text-left">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Hourglass className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h5 className="font-bold text-base text-foreground">Plataforma em Preparação!</h5>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    Estamos homologando as ONGs parceiras para trazer as melhores oportunidades de impacto. Volte em breve para cadastrar seu perfil de voluntário e começar a transformar vidas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
