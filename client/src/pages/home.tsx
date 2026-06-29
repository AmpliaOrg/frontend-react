import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SocialProof } from "@/components/social-proof";
import { Footer } from "@/components/footer";
import { api } from "@/lib/api";

export default function Home() {
  useEffect(() => {
    // Warm up the backend hosted on Render's free tier
    api.getAllTags().catch(() => {
      // Catch errors silently since this is only a wake-up ping
    });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
