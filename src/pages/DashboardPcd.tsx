import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Heart, 
  MapPin, 
  Clock, 
  User, 
  Edit, 
  Briefcase,
  Star,
  Building,
  Calendar,
} from "lucide-react";
import { ProfileEditModal } from "@/components/ProfileEditModal";

const DashboardPcd = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Mock data
  const perfilResumo = {
    nome: "Ana Silva",
    profissao: "Desenvolvedora Frontend",
    localizacao: "São Paulo, SP",
    nivelExperiencia: "Pleno",
    completude: 85
  };

  const vagasRecomendadas = [
    {
      id: 1,
      titulo: "Desenvolvedor React Senior",
      empresa: "TechCorp",
      localizacao: "São Paulo, SP",
      salario: "R$ 8.000 - R$ 12.000",
      tipo: "CLT",
      publicadoEm: "2 dias atrás",
      match: 95,
      favorita: true
    },
    {
      id: 2,
      titulo: "Frontend Developer",
      empresa: "StartupX",
      localizacao: "Remote",
      salario: "R$ 6.000 - R$ 9.000",
      tipo: "PJ",
      publicadoEm: "1 semana atrás",
      match: 88,
      favorita: false
    },
    {
      id: 3,
      titulo: "Desenvolvedor Full Stack",
      empresa: "InnovaTech",
      localizacao: "Rio de Janeiro, RJ",
      salario: "R$ 7.500 - R$ 11.000",
      tipo: "CLT",
      publicadoEm: "3 dias atrás",
      match: 82,
      favorita: true
    }
  ];

  const historicoCandidaturas = [
    {
      id: 1,
      vaga: "UX Designer",
      empresa: "DesignCo",
      dataAplicacao: "2024-01-15"
    },
    {
      id: 2,
      vaga: "Frontend Developer",
      empresa: "WebSolutions",
      dataAplicacao: "2024-01-10"
    },
    {
      id: 3,
      vaga: "Desenvolvedor React",
      empresa: "TechStart",
      dataAplicacao: "2024-01-05"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard PCD</h1>
              <p className="text-muted-foreground">Encontre oportunidades inclusivas</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt={perfilResumo.nome} />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-medium text-foreground">{perfilResumo.nome}</p>
                <p className="text-sm text-muted-foreground">{perfilResumo.profissao}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Painel Lateral */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Resumo do Perfil */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Meu Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Completude do perfil</span>
                    <span className="font-medium">{perfilResumo.completude}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${perfilResumo.completude}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{perfilResumo.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{perfilResumo.nivelExperiencia}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  <Edit className="w-4 h-4" />
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>

            {/* Filtros Rápidos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros Rápidos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Localização</label>
                  <Input placeholder="Ex: São Paulo, SP" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tipo de vaga</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">CLT</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">PJ</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Estágio</span>
                    </label>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  Aplicar Filtros
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Conteúdo Principal */}
          <main className="lg:col-span-3 space-y-6">
            {/* Histórico de Candidaturas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Histórico de Candidaturas
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Ver Todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicoCandidaturas.map((candidatura) => (
                    <div key={candidatura.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{candidatura.vaga}</p>
                        <p className="text-sm text-muted-foreground">{candidatura.empresa}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(candidatura.dataAplicacao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <ProfileEditModal 
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
      />
    </div>
  );
};

export default DashboardPcd;