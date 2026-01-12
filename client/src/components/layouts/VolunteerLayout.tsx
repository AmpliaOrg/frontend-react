import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Clock, 
  Award, 
  User, 
  LogOut,
  Menu
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Helper to check active route
  const isActive = (path: string) => location === path;

  // Mock user for now - in real app, get from AuthContext
  const user = {
    name: "Voluntário",
    avatar: "https://github.com/shadcn.png"
  };

  const navItems = [
    { href: "/volunteer-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/volunteer-history", label: "Meu Histórico", icon: Clock },
    { href: "/volunteer-certificates", label: "Certificados", icon: Award },
    { href: "/volunteer-profile", label: "Perfil", icon: User },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar-background border-r border-border">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold font-heading text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Impact<span className="text-foreground">Vol</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Portal do Voluntário</p>
      </div>

      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "cursor-pointer flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-md bg-card mb-4">
            <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">Voluntário</p>
            </div>
        </div>
        <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" />
            Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed h-full z-30">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
            <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-16 md:pt-8 w-full">
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
        </div>
      </main>
    </div>
  );
}
