import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CriarVagaModal } from "@/components/CriarVagaModal";
import { EditarVagaModal, Vaga } from "@/components/EditarVagaModal";
import { VisualizarVagaModal } from "@/components/VisualizarVagaModal";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Archive, 
  Users, 
  Briefcase, 
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const DashboardEmpresa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  
  // Mock data
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Empresa</h1>
              <p className="text-muted-foreground">Gerencie suas vagas e candidatos</p>
            </div>
            <Button 
              variant="secondary"
              className="gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Criar Vaga
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};

export default DashboardEmpresa;