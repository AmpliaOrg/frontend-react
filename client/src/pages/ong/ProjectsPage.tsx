import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ProjectDTO } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Target, 
  Calendar, 
  TrendingUp,
  FolderOpen,
  Loader2
} from "lucide-react";

export default function OngProjectsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const groupId = 1; // Default organization group ID

  // State for modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goalAmount: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE" as "ACTIVE" | "COMPLETED" | "CANCELLED"
  });

  // Fetch projects list
  const { data: projectsPage, isLoading } = useQuery({
    queryKey: ['ong-projects', statusFilter, groupId],
    queryFn: () => {
      if (statusFilter === "ALL") {
        return api.getProjectsByGroup(groupId, 0, 50);
      } else {
        return api.getProjectsByStatus(groupId, statusFilter, 0, 50);
      }
    },
    enabled: !!user,
  });

  const projects = Array.isArray(projectsPage) ? projectsPage : (projectsPage?.content || []);

  // Mutations
  const createMutation = useMutation({
    mutationFn: (newProject: ProjectDTO) => api.createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ong-projects'] });
      queryClient.invalidateQueries({ queryKey: ['donor-projects'] });
      toast.success("Projeto criado com sucesso!");
      setIsCreateOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error("Erro ao criar projeto.");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ guid, data }: { guid: string; data: Partial<ProjectDTO> }) => 
      api.updateProject(guid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ong-projects'] });
      queryClient.invalidateQueries({ queryKey: ['donor-projects'] });
      toast.success("Projeto atualizado com sucesso!");
      setIsEditOpen(false);
      setSelectedProject(null);
      resetForm();
    },
    onError: () => {
      toast.error("Erro ao atualizar projeto.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (guid: string) => api.deleteProject(guid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ong-projects'] });
      queryClient.invalidateQueries({ queryKey: ['donor-projects'] });
      toast.success("Projeto excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir projeto.");
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      goalAmount: "",
      startDate: "",
      endDate: "",
      status: "ACTIVE"
    });
  };

  const handleOpenEdit = (project: ProjectDTO) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      description: project.description || "",
      goalAmount: project.goalAmount.toString(),
      startDate: project.startDate || "",
      endDate: project.endDate || "",
      status: project.status || "ACTIVE"
    });
    setIsEditOpen(true);
  };

  const handleSubmit = (e: React.FormEvent, mode: "create" | "edit") => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("O nome do projeto é obrigatório.");
      return;
    }

    const parsedGoal = parseFloat(formData.goalAmount);
    if (isNaN(parsedGoal) || parsedGoal <= 0) {
      toast.error("A meta de arrecadação deve ser maior que zero.");
      return;
    }

    const payload: ProjectDTO = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      goalAmount: parsedGoal,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
      status: formData.status,
      groupId: groupId
    };

    if (mode === "create") {
      createMutation.mutate(payload);
    } else if (mode === "edit" && selectedProject?.guid) {
      updateMutation.mutate({ guid: selectedProject.guid, data: payload });
    }
  };

  const handleDelete = (guid: string) => {
    if (window.confirm("Tem certeza que deseja excluir/desativar este projeto?")) {
      deleteMutation.mutate(guid);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-foreground">Meus Projetos</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie campanhas de arrecadação financeira e acompanhe metas.
          </p>
        </div>
        <Button 
          onClick={() => { resetForm(); setIsCreateOpen(true); }}
          className="gap-2 cursor-pointer font-semibold"
        >
          <Plus className="h-4.5 w-4.5" />
          Novo Projeto
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        {[
          { key: "ALL", label: "Todos os Projetos" },
          { key: "ACTIVE", label: "Ativos" },
          { key: "COMPLETED", label: "Concluídos" },
          { key: "SUSPENDED", label: "Suspensos" }
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={statusFilter === tab.key ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter(tab.key)}
            className="font-medium text-xs rounded-full"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-28 w-full" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => {
            const progress = Math.min(
              100,
              Math.round(((project.currentAmount || 0) / (project.goalAmount || 1)) * 100)
            );

            const getStatusColor = (status: string) => {
              switch (status) {
                case "ACTIVE":
                  return "bg-emerald-500/10 text-emerald-500";
                case "COMPLETED":
                  return "bg-blue-500/10 text-blue-500";
                case "SUSPENDED":
                  return "bg-amber-500/10 text-amber-500";
                default:
                  return "bg-slate-500/10 text-slate-500";
              }
            };

            return (
              <Card key={project.guid} className="group overflow-hidden border border-border/60 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="h-24 bg-muted/40 group-hover:bg-muted/65 transition-colors flex items-center justify-between px-6 border-b border-border/30">
                    <Target className="w-8 h-8 text-muted-foreground/35 group-hover:scale-110 transition-transform duration-300" />
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-2xs font-extrabold uppercase tracking-wider ${getStatusColor(project.status || "ACTIVE")}`}>
                      {project.status === "ACTIVE" ? "Ativo" : project.status === "COMPLETED" ? "Concluído" : "Suspenso"}
                    </span>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                      {project.description || "Sem descrição informada."}
                    </CardDescription>
                  </CardHeader>
                </div>

                <CardContent className="space-y-4 pt-0 mt-auto">
                  {/* Progress info */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-2xs text-muted-foreground font-semibold">
                      <span>Arrecadado: R$ {project.currentAmount?.toLocaleString("pt-BR") || "0"}</span>
                      <span>Meta: R$ {project.goalAmount.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-2xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.endDate ? `Até ${new Date(project.endDate).toLocaleDateString("pt-BR")}` : "Sem data fim"}
                      </span>
                      <span className="font-extrabold text-primary">{progress}%</span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2 pt-2 border-t border-border/40">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOpenEdit(project)}
                      className="flex-1 gap-1.5 cursor-pointer text-xs font-semibold"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Editar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(project.guid!)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 cursor-pointer text-xs font-semibold"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/40">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/35 mb-3" />
          <h3 className="text-lg font-bold text-foreground">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-1">
            Cadastre campanhas ativas para receber doações diretas de doadores.
          </p>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={(e) => handleSubmit(e, "create")} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Novo Projeto</DialogTitle>
              <DialogDescription>
                Insira as informações da campanha de arrecadação.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Nome do Projeto *</label>
                <Input 
                  placeholder="Ex: Reflorestamento e Horta Comunitária" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Descrição</label>
                <Textarea 
                  placeholder="Explique o propósito deste projeto..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-muted-foreground">Meta de Arrecadação (R$) *</label>
                  <Input 
                    type="number"
                    step="0.01"
                    placeholder="Ex: 5000.00" 
                    value={formData.goalAmount}
                    onChange={(e) => setFormData({...formData, goalAmount: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Data de Início</label>
                  <Input 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Data de Fim</label>
                  <Input 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)} className="cursor-pointer font-semibold">Cancelar</Button>
              <Button type="submit" disabled={createMutation.isPending} className="cursor-pointer font-semibold">
                {createMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={(e) => handleSubmit(e, "edit")} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Editar Projeto</DialogTitle>
              <DialogDescription>
                Atualize as informações do projeto selecionado.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Nome do Projeto *</label>
                <Input 
                  placeholder="Ex: Reflorestamento e Horta Comunitária" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Descrição</label>
                <Textarea 
                  placeholder="Explique o propósito deste projeto..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Meta de Arrecadação (R$) *</label>
                  <Input 
                    type="number"
                    step="0.01"
                    placeholder="Ex: 5000.00" 
                    value={formData.goalAmount}
                    onChange={(e) => setFormData({...formData, goalAmount: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Status *</label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(val: any) => setFormData({...formData, status: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Ativo</SelectItem>
                      <SelectItem value="COMPLETED">Concluído</SelectItem>
                      <SelectItem value="SUSPENDED">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Data de Início</label>
                  <Input 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Data de Fim</label>
                  <Input 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)} className="cursor-pointer font-semibold">Cancelar</Button>
              <Button type="submit" disabled={updateMutation.isPending} className="cursor-pointer font-semibold">
                {updateMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
