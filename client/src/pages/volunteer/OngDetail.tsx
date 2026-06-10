import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Loader2, ArrowLeft, Heart, Globe, Mail, Phone } from "lucide-react";
import { useLocation, useParams } from "wouter";

export default function VolunteerOngDetail() {
  const [, setLocation] = useLocation();
  const { id } = useParams();

  const { data: ong, isLoading } = useQuery({
    queryKey: [`/api/ongs/${id}`],
    queryFn: () => api.getOngById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!ong) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">ONG não encontrada.</p>
        <Button variant="link" onClick={() => setLocation("/volunteer/ongs")}>
          Voltar para a lista
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button 
        variant="ghost" 
        onClick={() => setLocation("/volunteer/ongs")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para lista
      </Button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Card */}
        <Card className="w-full md:w-80 shrink-0">
          <CardHeader className="text-center">
            <div className="mx-auto h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Building2 className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl">{ong.organizationName || ong.name}</CardTitle>
            <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
              <MapPin className="mr-1 h-3 w-3" />
              {ong.address || "Brasil"}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              <Heart className="mr-2 h-4 w-4" />
              Seguir ONG
            </Button>
            
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-primary truncate">www.{ong.organizationName?.toLowerCase().replace(/\s/g, '') || "ong"}.org.br</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{ong.email || "contato@ong.org.br"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{ong.phone || "(00) 0000-0000"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="flex-1 space-y-8">
          <section className="space-y-4">
            <h3 className="text-2xl font-bold font-display">Sobre a Organização</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {ong.bio || "Esta organização é dedicada a criar impacto social positivo através de projetos sustentáveis e engajamento da comunidade. Nossa missão é ampliar as oportunidades para todos."}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold font-display">Missão e Valores</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-muted/30 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Transparência</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Garantimos que cada recurso seja utilizado de forma eficiente e rastreável.
                </CardContent>
              </Card>
              <Card className="bg-muted/30 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Impacto Social</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Focamos em resultados reais que transformam a vida das pessoas atendidas.
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
