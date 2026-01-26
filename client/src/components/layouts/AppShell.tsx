import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LogOut,
  Menu,
  Bell,
  LucideIcon
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import logo from "@assets/Amplia.svg";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  title?: string;
}

export default function AppShell({ children, navItems, title }: AppShellProps) {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  // Fetch user profile to get avatar
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile', user?.userId],
    queryFn: () => api.getUserProfile(user!.userId),
    enabled: !!user?.userId,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Helper to check active route
  const isActive = (path: string) => location === path;

  const handleNavigation = (path: string) => {
    setLocation(path);
    setIsOpen(false);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar-background border-r border-border">
      <div className="h-20 flex items-center gap-3 px-6 border-b border-border/40">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img src={logo} alt="Amplia Logo" className="h-full w-full object-contain" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight text-foreground">Amplia</span>
      </div>

      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={isActive(item.href) ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-base font-medium",
              !isActive(item.href) && "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => handleNavigation(item.href)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </div>

      <div className="p-4 border-t border-border/40 mt-auto">
        <div 
          className="flex items-center gap-3 p-2 rounded-xl bg-muted/50 mb-2 cursor-pointer hover:bg-muted transition-colors"
          onClick={() => handleNavigation('/profile')}
        >
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarImage src={userProfile?.avatarUrl} alt="Profile" />
              <AvatarFallback className="bg-primary/20 text-primary font-bold">
                {user?.firstName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden flex-1">
                <p className="text-sm font-medium truncate">
                    {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.firstName || user?.email || "Usuário"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.role || "USER"}</p>
            </div>
        </div>
        <Button 
            variant="outline" 
            size="sm"
            className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => {
                logout();
                setLocation('/login');
            }}
        >
            <LogOut className="h-4 w-4" />
            Sair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed h-full z-30 bg-background border-r border-border">
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
      <main className="flex-1 md:ml-64 w-full">
         {/* Header */}
         <header className="h-20 border-b border-border/40 bg-background/50 backdrop-blur-sm sticky top-0 z-20 px-8 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-foreground">{title || "Amplia"}</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background"></span>
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
        </div>
      </main>
    </div>
  );
}
