import AppShell from "./AppShell";
import { 
  Users, 
  Target, 
  LayoutDashboard,
  Heart
} from "lucide-react";

export default function OngLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
    { href: "/ong/volunteers", label: "Voluntários", icon: Users },
    { href: "/ong/projects", label: "Meus Projetos", icon: Target },
    { href: "/ong/donations", label: "Doações", icon: Heart },
  ];

  return (
    <AppShell navItems={navItems} title="Amplia">
      {children}
    </AppShell>
  );
}
