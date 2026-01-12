import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function VolunteerHistory() {
  const { user } = useAuth();

  const { data: history, isLoading } = useQuery({
    queryKey: ['volunteer-history', user?.userId],
    queryFn: () => api.getVolunteerHistory(user?.userId as string),
    enabled: !!user?.userId
  });

  if (isLoading) {
    return <div className="p-10 text-center">Carregando histórico...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold">Meu Histórico</h1>
        <p className="text-muted-foreground">Projetos e iniciativas que você participou.</p>
      </div>

      <div className="grid gap-6">
        {history?.map((participation: any) => (
            <Card key={participation.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow">
                <div className="w-full md:w-48 bg-secondary/30 flex items-center justify-center p-6">
                     <span className="text-4xl font-bold text-primary/30">
                        {participation.project?.name?.charAt(0) || "P"}
                     </span>
                </div>
                <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                        <div>
                            <CardTitle className="mb-2">{participation.project?.name}</CardTitle>
                            <CardDescription>{participation.project?.description}</CardDescription>
                        </div>
                        <Badge variant={participation.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {participation.status}
                        </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            <span>Entrou em: {new Date(participation.joinDate).toLocaleDateString()}</span>
                        </div>
                         <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Horas: {participation.hoursContributed}h</span>
                        </div>
                         <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">{participation.role || "Voluntário"}</Badge>
                        </div>
                    </div>
                </div>
            </Card>
        ))}

        {(!history || history.length === 0) && (
             <Card className="border-dashed py-12 text-center text-muted-foreground">
                <p>Você ainda não participou de nenhum projeto.</p>
             </Card>
        )}
      </div>
    </div>
  );
}
