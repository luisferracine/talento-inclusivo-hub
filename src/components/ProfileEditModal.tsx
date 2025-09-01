import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, User, Shield, FileText, Settings, Eye, EyeOff } from "lucide-react";
import { useAccessibility } from "@/hooks/use-accessibility";

import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const profileSchema = z.object({
  // Informações pessoais
  nomeCompleto: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  dataNascimento: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  
  // Dados adicionais
  endereco: z.string().optional(),
  
  // Acessibilidade
  fontesGrandes: z.boolean().default(false),
  modoDaltonismo: z.boolean().default(false),
  leitorTelaOtimizado: z.boolean().default(false),
  
  // Segurança
  senhaAtual: z.string().optional(),
  novaSenha: z.string().min(8, "Nova senha deve ter pelo menos 8 caracteres").optional(),
  confirmarSenha: z.string().optional(),
  autenticacaoDoisFatores: z.boolean().default(false),
}).refine((data) => {
  if (data.novaSenha && !data.senhaAtual) {
    return false;
  }
  if (data.novaSenha && data.novaSenha !== data.confirmarSenha) {
    return false;
  }
  return true;
}, {
  message: "Senhas não coincidem ou senha atual não informada",
  path: ["confirmarSenha"],
});

interface ProfileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileEditModal({ open, onOpenChange }: ProfileEditModalProps) {
  const [laudoPcd, setLaudoPcd] = useState<File | null>(null);
  const [curriculoVitae, setCurriculoVitae] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { toast } = useToast();
  const { settings: accessibilitySettings, updateSettings: updateAccessibilitySettings } = useAccessibility();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nomeCompleto: "Ana Silva",
      email: "ana.silva@email.com",
      telefone: "(11) 99999-9999",
      dataNascimento: new Date("1990-01-01"),
      endereco: "São Paulo, SP",
      fontesGrandes: accessibilitySettings.fontesGrandes,
      modoDaltonismo: accessibilitySettings.modoDaltonismo,
      leitorTelaOtimizado: accessibilitySettings.leitorTelaOtimizado,
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
      autenticacaoDoisFatores: false,
    },
  });


  const handleLaudoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLaudoPcd(file);
      toast({
        title: "Laudo PCD carregado",
        description: `Arquivo ${file.name} foi carregado com sucesso.`,
      });
    }
  };

  const handleCurriculoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCurriculoVitae(file);
      toast({
        title: "Currículo carregado",
        description: `Arquivo ${file.name} foi carregado com sucesso.`,
      });
    }
  };

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações pessoais e preferências.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Pessoal
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Acessibilidade
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documentos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">

                {/* Informações Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nomeCompleto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            O e-mail não pode ser alterado por questões de segurança.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataNascimento"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data de Nascimento</FormLabel>
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
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Dados Adicionais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dados Adicionais</h3>
                  
                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Cidade, Estado" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
              </TabsContent>

              <TabsContent value="accessibility" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preferências de Acessibilidade</h3>
                  <p className="text-muted-foreground">
                    Configure as opções de acessibilidade para melhorar sua experiência.
                  </p>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fontesGrandes"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                           <FormControl>
                             <Checkbox
                               checked={field.value}
                               onCheckedChange={(checked) => {
                                 field.onChange(checked);
                                 updateAccessibilitySettings({ fontesGrandes: checked as boolean });
                               }}
                             />
                           </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Fontes Grandes
                            </FormLabel>
                            <FormDescription>
                              Aumenta o tamanho das fontes em toda a plataforma para melhor legibilidade.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="modoDaltonismo"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                           <FormControl>
                             <Checkbox
                               checked={field.value}
                               onCheckedChange={(checked) => {
                                 field.onChange(checked);
                                 updateAccessibilitySettings({ modoDaltonismo: checked as boolean });
                               }}
                             />
                           </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Modo Daltonismo
                            </FormLabel>
                            <FormDescription>
                              Ajusta as cores da interface para pessoas com daltonismo.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leitorTelaOtimizado"
                      render={({ field }) => (
                         <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                           <FormControl>
                             <Checkbox
                               checked={field.value}
                               onCheckedChange={(checked) => {
                                 field.onChange(checked);
                                 updateAccessibilitySettings({ leitorTelaOtimizado: checked as boolean });
                               }}
                             />
                           </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Leitor de Tela Otimizado
                            </FormLabel>
                            <FormDescription>
                              Otimiza a interface para leitores de tela e tecnologias assistivas.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configurações de Segurança</h3>
                  
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">Alterar Senha</h4>
                    
                    <FormField
                      control={form.control}
                      name="senhaAtual"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha Atual</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua senha atual"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="novaSenha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nova Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type={showNewPassword ? "text" : "password"}
                                  placeholder="Digite a nova senha"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmarSenha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar Nova Senha</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                placeholder="Confirme a nova senha"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="autenticacaoDoisFatores"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Autenticação em Dois Fatores
                            </FormLabel>
                            <FormDescription>
                              Adiciona uma camada extra de segurança à sua conta.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <div className="space-y-6">
                  {/* Upload de Currículo */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Currículo Vitae</h3>
                    <p className="text-muted-foreground">
                      Faça upload do seu currículo para que as empresas possam conhecer melhor seu perfil profissional.
                    </p>

                    <div className="border-2 border-dashed border-muted rounded-lg p-6">
                      <div className="text-center space-y-4">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <h4 className="text-lg font-medium">Upload de Currículo</h4>
                          <p className="text-muted-foreground">
                            Arraste o arquivo aqui ou clique para selecionar
                          </p>
                        </div>
                        
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCurriculoUpload}
                          className="hidden"
                          id="curriculo-upload"
                        />
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('curriculo-upload')?.click()}
                          className="gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Selecionar Currículo
                        </Button>
                        
                        <p className="text-sm text-muted-foreground">
                          Formatos aceitos: PDF, DOC, DOCX (máx. 5MB)
                        </p>

                        {curriculoVitae && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm font-medium">{curriculoVitae.name}</span>
                              <Badge variant="secondary">Carregado</Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Upload de Laudo PCD */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Laudo PCD</h3>
                    <p className="text-muted-foreground">
                      Faça upload do seu laudo médico para validar sua condição PCD.
                    </p>

                  <div className="border-2 border-dashed border-muted rounded-lg p-6">
                    <div className="text-center space-y-4">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <h4 className="text-lg font-medium">Upload de Laudo PCD</h4>
                        <p className="text-muted-foreground">
                          Arraste o arquivo aqui ou clique para selecionar
                        </p>
                      </div>
                      
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleLaudoUpload}
                        className="hidden"
                        id="laudo-upload"
                      />
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('laudo-upload')?.click()}
                        className="gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Selecionar Arquivo
                      </Button>
                      
                      <p className="text-sm text-muted-foreground">
                        Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
                      </p>

                      {laudoPcd && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-medium">{laudoPcd.name}</span>
                            <Badge variant="secondary">Carregado</Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Informações Importantes sobre o Laudo:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• O laudo deve ser emitido por profissional habilitado</li>
                      <li>• Documento deve estar legível e completo</li>
                      <li>• As informações serão verificadas pela nossa equipe</li>
                      <li>• Seus dados serão mantidos em total sigilo</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Dicas para seu Currículo:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Mantenha as informações atualizadas</li>
                      <li>• Destaque suas principais competências</li>
                      <li>• Inclua experiências relevantes para vagas PCD</li>
                      <li>• Use formato PDF para melhor compatibilidade</li>
                    </ul>
                   </div>
                 </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}