import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

const formSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  descricao: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  localizacao: z.string().min(2, "Localização é obrigatória"),
  salario: z.string().min(1, "Salário é obrigatório"),
  dataInicio: z.date({
    required_error: "Data de início é obrigatória",
  }),
  dataFinal: z.date({
    required_error: "Data final é obrigatória",
  }),
  ativo: z.boolean().default(true),
}).refine((data) => data.dataFinal > data.dataInicio, {
  message: "Data final deve ser posterior à data de início",
  path: ["dataFinal"],
});

type FormData = z.infer<typeof formSchema>;

export interface Vaga {
  id: number;
  titulo: string;
  descricao?: string;
  localizacao?: string;
  salario?: string;
  dataInicio?: Date;
  dataFinal?: Date;
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
      salario: "",
      dataInicio: undefined,
      dataFinal: undefined,
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
        salario: vaga.salario || "",
        dataInicio: vaga.dataInicio,
        dataFinal: vaga.dataFinal,
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
        salario: data.salario,
        dataInicio: data.dataInicio,
        dataFinal: data.dataFinal,
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
              name="salario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salário</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: R$ 5.000 - R$ 8.000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataInicio"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Início</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataFinal"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data Final</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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