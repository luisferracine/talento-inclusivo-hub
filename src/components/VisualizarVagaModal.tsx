import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  MapPin,
  Users,
  Briefcase,
  CheckCircle,
  Clock
} from "lucide-react";
import { Vaga } from "@/components/EditarVagaModal";

interface VisualizarVagaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaga: Vaga | null;
}

export const VisualizarVagaModal = ({ 
  open, 
  onOpenChange, 
  vaga 
}: VisualizarVagaModalProps) => {
  if (!vaga) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{vaga.titulo}</DialogTitle>
              <DialogDescription className="mt-2">
                Detalhes completos da vaga de emprego
              </DialogDescription>
            </div>
            <Badge 
              variant={vaga.status === "Ativa" ? "default" : "secondary"}
              className="ml-4"
            >
              {vaga.status}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Informações Básicas */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Informações da Vaga
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Localização:</span>
                  <span>{vaga.localizacao}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Publicado em:</span>
                  <span>{formatDate(vaga.dataPublicacao)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Candidatos:</span>
                  <span>{vaga.candidatos}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">{vaga.tipo}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descrição */}
          {vaga.descricao && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Descrição da Vaga</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {vaga.descricao}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Requisitos */}
          {vaga.requisitos && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Requisitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {vaga.requisitos}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Acessibilidade */}
          {vaga.acessibilidade && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Recursos de Acessibilidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {vaga.acessibilidade}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Status e Estatísticas */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Status e Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">{vaga.candidatos}</div>
                  <div className="text-xs text-muted-foreground">Candidatos</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-secondary">
                    {vaga.status === "Ativa" ? "Ativa" : "Pausada"}
                  </div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-accent">{vaga.tipo}</div>
                  <div className="text-xs text-muted-foreground">Tipo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};