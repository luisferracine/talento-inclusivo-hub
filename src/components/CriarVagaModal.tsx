import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Briefcase, MapPin, FileText, Shield, Activity, DollarSign, Calendar as CalendarIcon2 } from "lucide-react";

const formSchema = z.object({
  titulo: z.string().min(1, "Título da vaga é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória").max(60, "Descrição deve ter no máximo 60 caracteres"),
  localTrabalho: z.string().min(1, "Local de trabalho é obrigatório"),
  salario: z.string().min(1, "Salário é obrigatório"),
  dataInicio: z.date({
    required_error: "Data de início é obrigatória",
  }),
  dataFinal: z.date({
    required_error: "Data final é obrigatória",
  }),
  acessibilidades: z.string().min(1, "Acessibilidades são obrigatórias").max(100, "Acessibilidades devem ter no máximo 100 caracteres"),
  statusAtividade: z.boolean().default(true),
}).refine((data) => data.dataFinal > data.dataInicio, {
  message: "Data final deve ser posterior à data de início",
  path: ["dataFinal"],
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
      salario: "",
      dataInicio: undefined,
      dataFinal: undefined,
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
              name="salario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Salário
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: R$ 5.000 - R$ 8.000"
                      {...field}
                    />
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
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Data de Início
                    </FormLabel>
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
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Data Final
                    </FormLabel>
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
                variant="secondary"
                className="text-secondary-foreground font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300"
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