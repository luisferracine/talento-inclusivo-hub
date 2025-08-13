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
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

const DashboardPcd = () => {
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
      status: "Em análise",
      dataAplicacao: "2024-01-15",
      statusColor: "default"
    },
    {
      id: 2,
      vaga: "Frontend Developer",
      empresa: "WebSolutions",
      status: "Aprovado",
      dataAplicacao: "2024-01-10",
      statusColor: "success"
    },
    {
      id: 3,
      vaga: "Desenvolvedor React",
      empresa: "TechStart",
      status: "Rejeitado",
      dataAplicacao: "2024-01-05",
      statusColor: "destructive"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Rejeitado":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

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
                <Button variant="outline" className="w-full gap-2">
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
            {/* Busca */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Buscar vagas por título, empresa ou habilidades..." 
                      className="pl-10"
                    />
                  </div>
                  <Button variant="default">
                    Buscar Vagas
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vagas Recomendadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Vagas Recomendadas para Você
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vagasRecomendadas.map((vaga) => (
                  <div key={vaga.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{vaga.titulo}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {vaga.match}% match
                          </Badge>
                          {vaga.favorita && (
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {vaga.empresa}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {vaga.localizacao}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {vaga.publicadoEm}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-primary">{vaga.salario}</span>
                          <Badge variant="outline">{vaga.tipo}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="default" size="sm">
                          Candidatar-se
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

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
                      <div className="flex items-center gap-3">
                        {getStatusIcon(candidatura.status)}
                        <div>
                          <p className="font-medium text-foreground">{candidatura.vaga}</p>
                          <p className="text-sm text-muted-foreground">{candidatura.empresa}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={candidatura.statusColor as any}
                          className="mb-1"
                        >
                          {candidatura.status}
                        </Badge>
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
    </div>
  );
};

export default DashboardPcd;