import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, MapPin, FileText, Shield, Activity } from "lucide-react";

const formSchema = z.object({
  titulo: z.string().min(1, "Título da vaga é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória").max(60, "Descrição deve ter no máximo 60 caracteres"),
  localTrabalho: z.string().min(1, "Local de trabalho é obrigatório"),
  requisitosGerais: z.string().min(1, "Requisitos gerais são obrigatórios").max(100, "Requisitos devem ter no máximo 100 caracteres"),
  acessibilidades: z.string().min(1, "Acessibilidades são obrigatórias").max(100, "Acessibilidades devem ter no máximo 100 caracteres"),
  statusAtividade: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface CriarVagaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CriarVagaModal({ open, onOpenChange }: CriarVagaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      localTrabalho: "",
      requisitosGerais: "",
      acessibilidades: "",
      statusAtividade: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Aqui você implementaria a lógica para salvar a vaga
      // Por exemplo, chamada para API/Supabase
      console.log("Dados da vaga:", data);
      
      toast({
        title: "Vaga criada com sucesso!",
        description: "A vaga foi publicada e está disponível para candidatos.",
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao criar vaga",
        description: "Ocorreu um erro ao tentar criar a vaga. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Criar Nova Vaga
          </DialogTitle>
          <DialogDescription>
            Preencha as informações da vaga para atrair os melhores talentos.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Título da Vaga
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Desenvolvedor Frontend Sênior"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Descrição (máx. 60 caracteres)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descrição da vaga..."
                      className="min-h-[80px]"
                      maxLength={60}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground text-right">
                    {field.value.length}/60 caracteres
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="localTrabalho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Local de Trabalho
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: São Paulo - SP / Remoto / Híbrido"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requisitosGerais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Requisitos Gerais (máx. 100 caracteres)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Requisitos e qualificações necessárias..."
                      className="min-h-[80px]"
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground text-right">
                    {field.value.length}/100 caracteres
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acessibilidades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Acessibilidades da Vaga (máx. 100 caracteres)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Recursos de acessibilidade disponíveis..."
                      className="min-h-[80px]"
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground text-right">
                    {field.value.length}/100 caracteres
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statusAtividade"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Status da Atividade
                    </FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Definir se a vaga estará ativa após a criação
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                variant="hero"
                className="text-primary-foreground font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300"
              >
                {isSubmitting ? "Criando..." : "Criar Vaga"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}