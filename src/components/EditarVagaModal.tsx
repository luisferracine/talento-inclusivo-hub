import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  descricao: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  localizacao: z.string().min(2, "Localização é obrigatória"),
  requisitos: z.string().min(10, "Os requisitos devem ter pelo menos 10 caracteres"),
  acessibilidade: z.string().optional(),
  ativo: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

export interface Vaga {
  id: number;
  titulo: string;
  descricao?: string;
  localizacao?: string;
  requisitos?: string;
  acessibilidade?: string;
  status: string;
  candidatos: number;
  dataPublicacao: string;
  tipo: string;
}

interface EditarVagaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaga: Vaga | null;
  onSave?: (vaga: Vaga) => void;
}

export const EditarVagaModal = ({ 
  open, 
  onOpenChange, 
  vaga,
  onSave 
}: EditarVagaModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      localizacao: "",
      requisitos: "",
      acessibilidade: "",
      ativo: true,
    },
  });

  // Preenche o formulário quando a vaga é selecionada
  useEffect(() => {
    if (vaga && open) {
      form.reset({
        titulo: vaga.titulo,
        descricao: vaga.descricao || "",
        localizacao: vaga.localizacao || "",
        requisitos: vaga.requisitos || "",
        acessibilidade: vaga.acessibilidade || "",
        ativo: vaga.status === "Ativa",
      });
    }
  }, [vaga, open, form]);

  const onSubmit = async (data: FormData) => {
    if (!vaga) return;
    
    setIsSubmitting(true);
    
    try {
      // Simula uma chamada para API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const vagaAtualizada: Vaga = {
        ...vaga,
        titulo: data.titulo,
        descricao: data.descricao,
        localizacao: data.localizacao,
        requisitos: data.requisitos,
        acessibilidade: data.acessibilidade,
        status: data.ativo ? "Ativa" : "Pausada",
      };
      
      onSave?.(vagaAtualizada);
      
      toast.success("Vaga atualizada com sucesso!");
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error("Erro ao atualizar vaga. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Vaga</DialogTitle>
          <DialogDescription>
            Atualize as informações da vaga de emprego.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Vaga</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Desenvolvedor Frontend" {...field} />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva as responsabilidades e objetivos da vaga..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="localizacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: São Paulo, SP ou Remoto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requisitos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisitos</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Liste os requisitos necessários para a vaga..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="acessibilidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recursos de Acessibilidade</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva os recursos de acessibilidade disponíveis (opcional)..."
                      className="min-h-[60px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Informe sobre adaptações, tecnologias assistivas ou outros recursos disponíveis.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Vaga Ativa</FormLabel>
                    <FormDescription>
                      A vaga estará visível para candidatos quando ativa.
                    </FormDescription>
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
            
            <DialogFooter className="flex gap-2">
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
                className="min-w-[120px]"
              >
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};