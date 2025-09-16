import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CriarVagaModal } from "@/components/CriarVagaModal";
import { EditarVagaModal, Vaga } from "@/components/EditarVagaModal";
import { VisualizarVagaModal } from "@/components/VisualizarVagaModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Archive, 
  Users, 
  Briefcase, 
  TrendingUp,
  Building,
  Settings,
  LogIn,
  Lock,
  User,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "sonner";

// Schemas
const colaboradorLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const editProfileSchema = z.object({
  nomeFantasia: z.string().min(2, "Nome fantasia deve ter pelo menos 2 caracteres"),
  razaoSocial: z.string().min(2, "Razão social deve ter pelo menos 2 caracteres"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Senha atual obrigatória"),
  newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

const DashboardEmpresa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isColaboradorLoginOpen, setIsColaboradorLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  
  // Mock data
  const empresaInfo = {
    nomeFantasia: "TechCorp Inovação",
    razaoSocial: "TechCorp Inovação Ltda",
    cnpj: "12.345.678/0001-90",
    email: "contato@techcorp.com",
    phone: "(11) 99999-9999",
    avatar: "/placeholder-company.jpg"
  };

  const metrics = {
    totalVagas: 12,
    totalCandidatos: 89,
    novasCandidaturas: 23
  };

  const [vagas, setVagas] = useState<Vaga[]>([
    {
      id: 1,
      titulo: "Desenvolvedor Frontend",
      descricao: "Desenvolvimento de interfaces web modernas e responsivas",
      localizacao: "São Paulo, SP",
      requisitos: "React, TypeScript, Tailwind CSS",
      acessibilidade: "Suporte para leitores de tela",
      status: "Ativa",
      candidatos: 15,
      dataPublicacao: "2024-01-10",
      tipo: "CLT"
    },
    {
      id: 2,
      titulo: "Analista de Dados",
      descricao: "Análise de dados para tomada de decisões estratégicas",
      localizacao: "Remoto",
      requisitos: "Python, SQL, Power BI",
      acessibilidade: "Ferramentas de análise acessíveis",
      status: "Ativa",
      candidatos: 8,
      dataPublicacao: "2024-01-08",
      tipo: "PJ"
    },
    {
      id: 3,
      titulo: "Designer UX/UI",
      descricao: "Criação de experiências digitais inclusivas",
      localizacao: "Rio de Janeiro, RJ",
      requisitos: "Figma, Adobe XD, Design System",
      acessibilidade: "Design inclusivo e acessível",
      status: "Pausada",
      candidatos: 22,
      dataPublicacao: "2024-01-05",
      tipo: "CLT"
    }
  ]);

  // Forms
  const colaboradorLoginForm = useForm<z.infer<typeof colaboradorLoginSchema>>({
    resolver: zodResolver(colaboradorLoginSchema),
  });

  const editProfileForm = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: empresaInfo,
  });

  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  // Handlers
  const handleEditVaga = (vaga: Vaga) => {
    setSelectedVaga(vaga);
    setIsEditModalOpen(true);
  };

  const handleViewVaga = (vaga: Vaga) => {
    setSelectedVaga(vaga);
    setIsViewModalOpen(true);
  };

  const handleArchiveVaga = (vaga: Vaga) => {
    const vagaAtualizada: Vaga = {
      ...vaga,
      status: vaga.status === "Pausada" ? "Ativa" : "Pausada"
    };
    
    setVagas(vagas.map(v => v.id === vaga.id ? vagaAtualizada : v));
    
    const action = vagaAtualizada.status === "Pausada" ? "pausada" : "ativada";
    toast.success(`Vaga ${action} com sucesso!`);
  };

  const handleSaveVaga = (vagaAtualizada: Vaga) => {
    setVagas(vagas.map(v => v.id === vagaAtualizada.id ? vagaAtualizada : v));
  };

  const onColaboradorLogin = (values: z.infer<typeof colaboradorLoginSchema>) => {
    console.log("Colaborador Login:", values);
    toast.success("Login de colaborador realizado com sucesso!");
    setIsColaboradorLoginOpen(false);
  };

  const onEditProfile = (values: z.infer<typeof editProfileSchema>) => {
    console.log("Edit Profile:", values);
    toast.success("Perfil atualizado com sucesso!");
    setIsEditProfileOpen(false);
  };

  const onChangePassword = (values: z.infer<typeof changePasswordSchema>) => {
    console.log("Change Password:", values);
    toast.success("Senha alterada com sucesso!");
    setIsChangePasswordOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Empresa</h1>
              <p className="text-muted-foreground">Gerencie suas vagas e equipe</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={empresaInfo.avatar} alt={empresaInfo.nomeFantasia} />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-medium text-foreground">{empresaInfo.nomeFantasia}</p>
                <p className="text-sm text-muted-foreground">{empresaInfo.razaoSocial}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Painel Lateral */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Informações da Empresa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Minha Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">CNPJ:</span>
                    <p className="text-muted-foreground">{empresaInfo.cnpj}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-muted-foreground">{empresaInfo.email}</p>
                  </div>
                  <div>
                    <span className="font-medium">Telefone:</span>
                    <p className="text-muted-foreground">{empresaInfo.phone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setIsEditProfileOpen(true)}
                  >
                    <Edit className="w-4 h-4" />
                    Editar Perfil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setIsChangePasswordOpen(true)}
                  >
                    <Lock className="w-4 h-4" />
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Login Colaborador */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Colaboradores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="secondary" 
                  className="w-full gap-2"
                  onClick={() => setIsColaboradorLoginOpen(true)}
                >
                  <LogIn className="w-4 h-4" />
                  Login Colaborador
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Acesso exclusivo para membros da equipe
                </p>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="default"
                  className="w-full gap-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Criar Vaga
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Users className="w-4 h-4" />
                  Ver Candidatos
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Conteúdo Principal */}
          <main className="lg:col-span-3 space-y-6">
            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Vagas</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{metrics.totalVagas}</div>
                  <p className="text-xs text-muted-foreground">+2 desde o mês passado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Candidatos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{metrics.totalCandidatos}</div>
                  <p className="text-xs text-muted-foreground">+15 esta semana</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Novas Candidaturas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{metrics.novasCandidaturas}</div>
                  <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Vagas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vagas Publicadas</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input 
                        placeholder="Pesquisar vagas..." 
                        className="pl-8 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título da Vaga</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Candidatos</TableHead>
                      <TableHead>Data de Publicação</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vagas.map((vaga) => (
                      <TableRow key={vaga.id}>
                        <TableCell className="font-medium">{vaga.titulo}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              vaga.status === "Ativa" ? "default" : "secondary"
                            }
                          >
                            {vaga.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {vaga.candidatos}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{vaga.tipo}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Visualizar vaga"
                              onClick={() => handleViewVaga(vaga)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Editar vaga"
                              onClick={() => handleEditVaga(vaga)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title={vaga.status === "Pausada" ? "Ativar vaga" : "Pausar vaga"}
                              onClick={() => handleArchiveVaga(vaga)}
                            >
                              <Archive className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pesquisa de Candidatos */}
            <Card>
              <CardHeader>
                <CardTitle>Pesquisar Candidatos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Buscar por nome, habilidades ou localização..." 
                      className="pl-8"
                    />
                  </div>
                  <Button variant="secondary">
                    Pesquisar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Modals */}
      <CriarVagaModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
      />
      
      <EditarVagaModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        vaga={selectedVaga}
        onSave={handleSaveVaga}
      />
      
      <VisualizarVagaModal 
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        vaga={selectedVaga}
      />

      {/* Login Colaborador Modal */}
      <Dialog open={isColaboradorLoginOpen} onOpenChange={setIsColaboradorLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Colaborador</DialogTitle>
            <DialogDescription>
              Acesso exclusivo para membros da equipe
            </DialogDescription>
          </DialogHeader>
          <Form {...colaboradorLoginForm}>
            <form onSubmit={colaboradorLoginForm.handleSubmit(onColaboradorLogin)} className="space-y-4">
              <FormField
                control={colaboradorLoginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="email@empresa.com"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={colaboradorLoginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Perfil da Empresa</DialogTitle>
            <DialogDescription>
              Atualize as informações da sua empresa
            </DialogDescription>
          </DialogHeader>
          <Form {...editProfileForm}>
            <form onSubmit={editProfileForm.handleSubmit(onEditProfile)} className="space-y-4">
              <FormField
                control={editProfileForm.control}
                name="nomeFantasia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Fantasia</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editProfileForm.control}
                name="razaoSocial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editProfileForm.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="00.000.000/0001-00" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editProfileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input {...field} type="email" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editProfileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Digite sua senha atual e a nova senha
            </DialogDescription>
          </DialogHeader>
          <Form {...changePasswordForm}>
            <form onSubmit={changePasswordForm.handleSubmit(onChangePassword)} className="space-y-4">
              <FormField
                control={changePasswordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha Atual</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={changePasswordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={changePasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardEmpresa;