import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download } from "lucide-react";

export default function VolunteerCertificates() {
  const { user } = useAuth();

  const { data: certificates, isLoading } = useQuery({
    queryKey: ['volunteer-certificates', user?.userId],
    queryFn: () => api.getVolunteerCertificates(user?.userId as string),
    enabled: !!user?.userId
  });

  if (isLoading) {
    return <div className="p-10 text-center">Carregando certificados...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold">Meus Certificados</h1>
        <p className="text-muted-foreground">Conquistas e reconhecimentos pela sua dedicação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates?.map((cert: any) => (
            <Card key={cert.id} className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Award className="w-8 h-8" />
                    </div>
                    <div>
                         <CardTitle className="text-lg">{cert.title}</CardTitle>
                         <CardDescription>{new Date(cert.issueDate).toLocaleDateString()}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="mt-4">
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full gap-2 group">
                        <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        Baixar Certificado
                    </Button>
                </CardFooter>
            </Card>
        ))}

        {(!certificates || certificates.length === 0) && (
             <div className="col-span-full border-2 border-dashed rounded-xl py-12 text-center text-muted-foreground">
                <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-lg font-medium">Nenhum certificado disponível</p>
                <p className="text-sm">Participe de projetos para ganhar certificados!</p>
             </div>
        )}
      </div>
    </div>
  );
}
