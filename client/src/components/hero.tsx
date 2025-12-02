import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Briefcase, Building2 } from "lucide-react";
import heroImage from "@assets/generated_images/volunteers_working_in_a_field.png";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Plataforma de Impacto Social
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl xl:text-6xl/none">
                Amplia: conectando pessoas, ONGs e empresas.
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                O sério não precisa ser complicado. Uma ponte digital entre quem quer ajudar e quem precisa ser ajudado.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button size="lg" className="group relative overflow-hidden rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8">
                <Heart className="mr-2 h-5 w-5" />
                Sou ONG
                <span className="absolute inset-0 flex items-center justify-center bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary">
                <ArrowRight className="mr-2 h-5 w-5" />
                Sou Voluntário
              </Button>
              <Button size="lg" variant="ghost" className="rounded-xl h-14 px-8 text-muted-foreground hover:text-foreground">
                Sou Empresa
              </Button>
            </motion.div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                 {[1,2,3].map((i) => (
                   <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold">
                     {i}
                   </div>
                 ))}
              </div>
              <p>Mais de <strong className="text-foreground">50 ONGs</strong> já ampliam seu impacto com a gente.</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto lg:mr-0 lg:ml-auto"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 ring-1 ring-border/50">
              <img
                alt="Voluntários trabalhando juntos"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                src={heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 backdrop-blur-sm shadow-lg border border-white/20 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Impacto gerado</p>
                    <p className="text-lg font-bold text-foreground">+1.200 vidas transformadas</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 -z-10 h-[300px] w-[300px] rounded-full bg-secondary blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
