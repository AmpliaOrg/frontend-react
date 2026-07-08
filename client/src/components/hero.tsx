import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Briefcase, Building2 } from "lucide-react";
import heroImage from "@assets/generated_images/muie.png";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { InteractiveGrid } from "@/components/InteractiveGrid";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 md:pt-24 md:pb-32">
      <InteractiveGrid />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
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
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            >
              <Link href="/ong/interesse">
                <Button size="lg" className="group relative overflow-hidden rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 cursor-pointer w-full sm:w-auto">
                  <Heart className="mr-2 h-5 w-5" />
                  Sou ONG
                  <span className="absolute inset-0 flex items-center justify-center bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Button>
              </Link>
              <Link href="/voluntario/interesse">
                <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary cursor-pointer w-full sm:w-auto">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Sou Voluntário
                </Button>
              </Link>
              <Link href="/empresa/interesse">
                <Button size="lg" variant="ghost" className="rounded-xl h-14 px-8 text-muted-foreground hover:text-foreground cursor-pointer w-full sm:w-auto">
                  Sou Empresa
                </Button>
              </Link>
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
            className="relative mx-auto lg:mr-0 lg:ml-auto -mt-8 lg:-mt-16"
          >
            <div className="relative w-full max-w-lg lg:max-w-2xl mx-auto aspect-[4/3] flex items-end">
              {/* The "quadrado" background box - 70% height of the container, placed at the bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[70%] rounded-3xl bg-gradient-to-tr from-muted/50 to-muted/80 shadow-2xl shadow-primary/10 ring-1 ring-border/50 overflow-hidden">
                {/* Dark gradient overlay to give high contrast highlight to the foreground image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70"></div>
              </div>
              
              {/* The transparent image - scaled up and anchored to the bottom to align baselines exactly */}
              <img
                alt="Voluntários trabalhando juntos"
                className="relative z-10 w-full h-auto max-h-[110%] object-contain origin-bottom scale-120 lg:scale-130 drop-shadow-2xl"
                src={heroImage}
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl bg-white/95 dark:bg-card/95 p-4 backdrop-blur-sm shadow-xl border border-border/50 max-w-sm mx-auto lg:mx-0">
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
