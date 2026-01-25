import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import logo from "@assets/Amplia.svg";

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["ONG", "COMPANY", "VOLUNTEER", "USER"]),
  // ONG fields
  organizationName: z.string().optional(),
  cnpj: z.string().optional(),
  // Company fields
  companyName: z.string().optional(),
  companyCnpj: z.string().optional(),
  // Volunteer fields
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("USER");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "USER",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    // Validate required fields based on role
    if (data.role === "ONG" && (!data.organizationName || !data.cnpj)) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome da organização e CNPJ são obrigatórios para ONGs",
        variant: "destructive",
      });
      return;
    }

    if (data.role === "COMPANY" && (!data.companyName || !data.companyCnpj)) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome da empresa e CNPJ são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    if (data.role === "VOLUNTEER" && (!data.firstName || !data.lastName)) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e sobrenome são obrigatórios para voluntários",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.register(data);
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response));
      setUser(response);
      
      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo ao Amplia.",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível completar o cadastro",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setValue("role", value as any);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
            <img src={logo} alt="Amplia Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <CardTitle className="text-3xl font-display font-bold">Criar Conta</CardTitle>
            <CardDescription className="text-base mt-2">
              Junte-se à nossa comunidade
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Tipo de Conta *</Label>
              <Select onValueChange={handleRoleChange} defaultValue="USER">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Doador Individual</SelectItem>
                  <SelectItem value="ONG">ONG / Organização</SelectItem>
                  <SelectItem value="COMPANY">Empresa</SelectItem>
                  <SelectItem value="VOLUNTEER">Voluntário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ONG Fields */}
            {selectedRole === "ONG" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Nome da Organização *</Label>
                  <Input
                    id="organizationName"
                    placeholder="Nome da ONG"
                    {...register("organizationName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    {...register("cnpj")}
                  />
                </div>
              </div>
            )}

            {/* Company Fields */}
            {selectedRole === "COMPANY" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa *</Label>
                  <Input
                    id="companyName"
                    placeholder="Nome da empresa"
                    {...register("companyName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyCnpj">CNPJ *</Label>
                  <Input
                    id="companyCnpj"
                    placeholder="00.000.000/0000-00"
                    {...register("companyCnpj")}
                  />
                </div>
              </div>
            )}

            {/* Volunteer Fields */}
            {selectedRole === "VOLUNTEER" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome *</Label>
                  <Input
                    id="firstName"
                    placeholder="Seu nome"
                    {...register("firstName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome *</Label>
                  <Input
                    id="lastName"
                    placeholder="Seu sobrenome"
                    {...register("lastName")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    {...register("phone")}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <button
                onClick={() => setLocation("/login")}
                className="text-primary hover:underline font-medium"
              >
                Faça login
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
