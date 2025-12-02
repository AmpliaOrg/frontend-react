import { 
  Users, 
  Building2, 
  HeartHandshake, 
  CheckCircle2, 
  BarChart3, 
  Award 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "ONGs",
    icon: Users,
    description: "Cadastro transparente e validação para garantir credibilidade. Gerencie seus projetos e mostre seu impacto.",
    benefits: ["Página verificada", "Gestão de doações", "Recrutamento de voluntários"],
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Voluntários",
    icon: HeartHandshake,
    description: "Conecte-se com propósitos reais. Encontre causas que combinam com você e receba certificados digitais.",
    benefits: ["Certificados automáticos", "Histórico de impacto", "Vagas personalizadas"],
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Empresas",
    icon: Building2,
    description: "Patrocínio rastreável e relatórios ESG. Apoie projetos validados e acompanhe cada centavo investido.",
    benefits: ["Relatórios de impacto", "Selo de parceiro", "Engajamento de colaboradores"],
    color: "text-amber-600",
    bg: "bg-amber-50"
  }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
            Como a Amplia funciona
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
            Nossa plataforma conecta as três pontas essenciais do impacto social em um ecossistema transparente.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden border-none shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className={`absolute top-0 right-0 h-32 w-32 -mr-8 -mt-8 rounded-full ${feature.bg} opacity-50 blur-2xl`}></div>
              
              <CardHeader>
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-sm font-medium text-foreground/80">
                      <CheckCircle2 className={`mr-2 h-4 w-4 ${feature.color}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
