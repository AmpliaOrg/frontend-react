import AppShell from "./AppShell";
import { 
  LayoutDashboard, 
  Heart, 
  User,
  Building2
} from "lucide-react";

export default function DonorLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/donor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/donor/donations", label: "Minhas Doações", icon: Heart },
    { href: "/donor/ongs", label: "Explorar ONGs", icon: Building2 },
    { href: "/donor/profile", label: "Perfil", icon: User },
  ];

  return (
    <AppShell navItems={navItems} title="Portal do Doador">
      {children}
    </AppShell>
  );
}
