import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, Building2, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Vagas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const vagas = [
    {
      id: 1,
      titulo: "Desenvolvedor Frontend",
      empresa: "Tech Solutions",
      localizacao: "São Paulo, SP",
      tipo: "CLT",
      modalidade: "Remoto",
      salario: "R$ 5.000 - R$ 8.000",
      descricao: "Desenvolvimento de interfaces web responsivas usando React e TypeScript.",
      requisitos: ["React", "TypeScript", "HTML/CSS", "Git"],
      publicadoEm: "2 dias atrás"
    },
    {
      id: 2,
      titulo: "Analista de Suporte",
      empresa: "Conecta Tech",
      localizacao: "Rio de Janeiro, RJ",
      tipo: "CLT",
      modalidade: "Híbrido",
      salario: "R$ 3.500 - R$ 5.000",
      descricao: "Atendimento ao cliente e resolução de problemas técnicos.",
      requisitos: ["Comunicação", "Informática básica", "Paciência", "Organização"],
      publicadoEm: "1 dia atrás"
    },
    {
      id: 3,
      titulo: "Designer UX/UI",
      empresa: "Creative Studio",
      localizacao: "Belo Horizonte, MG",
      tipo: "PJ",
      modalidade: "Presencial",
      salario: "R$ 4.000 - R$ 7.000",
      descricao: "Criação de interfaces intuitivas e experiências de usuário excepcionais.",
      requisitos: ["Figma", "Adobe XD", "Prototipagem", "Design thinking"],
      publicadoEm: "3 dias atrás"
    },
    {
      id: 4,
      titulo: "Assistente Administrativo",
      empresa: "Empresas Inclusivas",
      localizacao: "Porto Alegre, RS",
      tipo: "CLT",
      modalidade: "Presencial",
      salario: "R$ 2.500 - R$ 3.500",
      descricao: "Organização de documentos, atendimento telefônico e tarefas administrativas.",
      requisitos: ["Pacote Office", "Organização", "Comunicação", "Proatividade"],
      publicadoEm: "5 dias atrás"
    },
    {
      id: 5,
      titulo: "Analista de Dados",
      empresa: "Data Corp",
      localizacao: "Brasília, DF",
      tipo: "CLT",
      modalidade: "Remoto",
      salario: "R$ 6.000 - R$ 9.000",
      descricao: "Análise de dados para tomada de decisões estratégicas.",
      requisitos: ["SQL", "Python", "Excel", "Power BI"],
      publicadoEm: "1 semana atrás"
    },
    {
      id: 6,
      titulo: "Atendente de Call Center",
      empresa: "Contact Solutions",
      localizacao: "Recife, PE",
      tipo: "CLT",
      modalidade: "Presencial",
      salario: "R$ 1.800 - R$ 2.500",
      descricao: "Atendimento telefônico ao cliente com foco em qualidade e satisfação.",
      requisitos: ["Comunicação clara", "Paciência", "Informática básica", "Flexibilidade"],
      publicadoEm: "4 dias atrás"
    }
  ];

  const filteredVagas = vagas.filter(vaga => {
    const matchesSearch = vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaga.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "all" || vaga.localizacao.includes(filterLocation);
    const matchesType = filterType === "all" || vaga.tipo === filterType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Vagas Disponíveis</h1>
              <p className="text-muted-foreground mt-2">
                Encontre oportunidades que valorizam a diversidade e inclusão
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {filteredVagas.length} vagas encontradas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Filtrar Vagas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cargo ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  <SelectItem value="São Paulo">São Paulo</SelectItem>
                  <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                  <SelectItem value="Porto Alegre">Porto Alegre</SelectItem>
                  <SelectItem value="Brasília">Brasília</SelectItem>
                  <SelectItem value="Recife">Recife</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="CLT">CLT</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                  <SelectItem value="Estágio">Estágio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Vagas */}
        <div className="grid gap-6">
          {filteredVagas.map((vaga) => (
            <Card key={vaga.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{vaga.titulo}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
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
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">{vaga.tipo}</Badge>
                      <Badge variant="outline">{vaga.modalidade}</Badge>
                      <Badge variant="default">{vaga.salario}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{vaga.descricao}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Requisitos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vaga.requisitos.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Vaga inclusiva para PCD
                  </div>
                  <Button variant="default">
                    Candidatar-se
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVagas.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">
                Nenhuma vaga encontrada com os filtros aplicados.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Vagas;