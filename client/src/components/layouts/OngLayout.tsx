import AppShell from "./AppShell";
import { 
  Users, 
  Target, 
  LayoutDashboard,
  Heart,
  User
} from "lucide-react";

export default function OngLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/ong/dashboard", label: "Visão Geral", icon: LayoutDashboard },
    { href: "/ong/volunteers", label: "Voluntários", icon: Users },
    { href: "/ong/projects", label: "Meus Projetos", icon: Target },
    { href: "/ong/donations", label: "Doações", icon: Heart },
    { href: "/ong/profile", label: "Perfil da ONG", icon: User },
  ];

  return (
    <AppShell navItems={navItems} title="Amplia">
      {children}
    </AppShell>
  );
}
