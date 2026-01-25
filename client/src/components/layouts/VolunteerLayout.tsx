import AppShell from "./AppShell";
import { 
  LayoutDashboard, 
  Clock, 
  Award, 
  User 
} from "lucide-react";

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/volunteer-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/volunteer-history", label: "Meu Histórico", icon: Clock },
    { href: "/volunteer-certificates", label: "Certificados", icon: Award },
    { href: "/volunteer-profile", label: "Perfil", icon: User },
  ];

  return (
    <AppShell navItems={navItems} title="Amplia">
      {children}
    </AppShell>
  );
}
