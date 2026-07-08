import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Read from localStorage on initialization
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    
    // Fallback to system preferences
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 text-muted-foreground hover:text-foreground transition-all hover:bg-muted"
      title={theme === "light" ? "Ativar Modo Escuro" : "Ativar Modo Claro"}
      aria-label="Alternar tema de cores"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 transition-transform hover:rotate-12" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500 transition-transform hover:rotate-45" />
      )}
    </Button>
  );
}
