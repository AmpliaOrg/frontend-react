import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function VolunteerOngsPage() {
  const [, setLocation] = useLocation();
  const { data: ongs, isLoading } = useQuery({
    queryKey: ["/api/ongs"],
    queryFn: () => api.getAllOngs(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-display font-bold text-foreground">Explorar ONGs</h2>
        <p className="text-lg text-muted-foreground">Conheça as organizações parceiras e encontre sua próxima causa.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ongs?.map((ong: any) => (
          <Card key={ong.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{ong.organizationName || ong.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {ong.address || "Brasil"}
                  </div>
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {ong.bio || "Transformando vidas através da colaboração e impacto social sustentável."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setLocation(`/volunteer/ongs/${ong.id}`)}
                className="w-full group"
              >
                Ver Detalhes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {ongs?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Nenhuma ONG encontrada no momento.</p>
        </div>
      )}
    </div>
  );
}
