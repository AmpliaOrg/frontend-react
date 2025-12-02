import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Sprout, Users } from "lucide-react";
import agroImage from "@assets/generated_images/hands_holding_harvest.png";
import volunteerAvatar from "@assets/generated_images/volunteer_portrait.png";

export function SocialProof() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm rounded-full">
                Estudo de Caso
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display mb-6">
                Transparência que gera confiança.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Veja como a <strong className="text-foreground">ONG AgroAjuda</strong> utilizou a Amplia para financiar o projeto "Hortas Sustentáveis" e recrutar voluntários especializados.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Doações Rastreáveis</h3>
                  <p className="text-muted-foreground">Cada centavo doado é registrado e mostrado em gráficos de tempo real.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Voluntariado Certificado</h3>
                  <p className="text-muted-foreground">Voluntários recebem certificados digitais verificáveis após a conclusão.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card Visualization */}
          <div className="relative">
            {/* Main Project Card */}
            <Card className="overflow-hidden border-none shadow-2xl rounded-3xl bg-card ring-1 ring-border/50">
              <div className="relative h-48 w-full">
                <img 
                  src={agroImage} 
                  alt="Hortas Sustentáveis" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-foreground hover:bg-white shadow-sm backdrop-blur-md">
                    <CheckCircle className="mr-1 h-3 w-3 text-primary fill-white" />
                    ONG Verificada
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-display">Hortas Sustentáveis</h3>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      Minas Gerais
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Apoio a pequenos agricultores familiares com capacitação e equipamentos de irrigação.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-primary">R$ 14.000,00</span>
                    <span className="text-muted-foreground">meta R$ 25.000,00</span>
                  </div>
                  <Progress value={56} className="h-3 bg-muted [&>div]:bg-primary" />
                  <p className="text-xs text-muted-foreground text-right">56% atingido</p>
                </div>

                <div className="bg-muted/30 -mx-6 -mb-6 p-4 border-t border-border/50 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                         <img src={volunteerAvatar} alt="Lucas" className="h-full w-full object-cover" />
                       </div>
                       <div className="text-sm">
                         <p className="font-semibold">Lucas M.</p>
                         <p className="text-xs text-muted-foreground">Doador Recente</p>
                       </div>
                    </div>
                    <Button size="sm" className="rounded-full">Doar Agora</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Mini Job Card */}
            <Card className="absolute -bottom-12 -left-8 w-72 shadow-xl border-none rounded-2xl hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Assistente de Hortas</h4>
                    <p className="text-xs text-muted-foreground">Vagas: 5 • Presencial</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs h-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                  Inscrever-se
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
