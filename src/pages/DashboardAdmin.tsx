import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Eye, Ear, Accessibility, Plus, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Schemas para os formulários
const deficienciaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  tipos: z.array(z.enum(["motora", "auditiva", "visual"])).min(1, "Selecione pelo menos um tipo de deficiência"),
  barreira: z.string().optional(),
  acessibilidade: z.string().optional(),
});

const barreiraSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

const acessibilidadeSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

const DashboardAdmin = () => {
  const [activeForm, setActiveForm] = useState<'deficiencia' | 'barreira' | 'acessibilidade'>('deficiencia');

  // Forms
  const deficienciaForm = useForm<z.infer<typeof deficienciaSchema>>({
    resolver: zodResolver(deficienciaSchema),
    defaultValues: {
      nome: "",
      tipos: [],
      barreira: "",
      acessibilidade: "",
    },
  });

  const barreiraForm = useForm<z.infer<typeof barreiraSchema>>({
    resolver: zodResolver(barreiraSchema),
  });

  const acessibilidadeForm = useForm<z.infer<typeof acessibilidadeSchema>>({
    resolver: zodResolver(acessibilidadeSchema),
  });

  // Handlers
  const onDeficienciaSubmit = (values: z.infer<typeof deficienciaSchema>) => {
    console.log("Deficiência:", values);
    toast.success("Deficiência cadastrada com sucesso!");
    deficienciaForm.reset();
  };

  const onBarreiraSubmit = (values: z.infer<typeof barreiraSchema>) => {
    console.log("Barreira:", values);
    toast.success("Barreira cadastrada com sucesso!");
    barreiraForm.reset();
  };

  const onAcessibilidadeSubmit = (values: z.infer<typeof acessibilidadeSchema>) => {
    console.log("Acessibilidade:", values);
    toast.success("Acessibilidade cadastrada com sucesso!");
    acessibilidadeForm.reset();
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'motora': return 'Deficiência motora';
      case 'auditiva': return 'Deficiência auditiva';
      case 'visual': return 'Deficiência visual';
      default: return tipo;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'motora': return <Accessibility className="w-4 h-4" />;
      case 'auditiva': return <Ear className="w-4 h-4" />;
      case 'visual': return <Eye className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full bg-card shadow-soft border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Dashboard Admin</h1>
                <p className="text-sm text-muted-foreground">Gerenciamento do sistema</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login-admin" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sair
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Formulários
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeForm === 'deficiencia' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveForm('deficiencia')}
                >
                  <Accessibility className="w-4 h-4 mr-2" />
                  Deficiência
                </Button>
                <Button
                  variant={activeForm === 'barreira' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveForm('barreira')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Barreira
                </Button>
                <Button
                  variant={activeForm === 'acessibilidade' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveForm('acessibilidade')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Acessibilidade
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Formulário Deficiência */}
            {activeForm === 'deficiencia' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Accessibility className="w-5 h-5" />
                    Cadastrar Deficiência
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...deficienciaForm}>
                    <form onSubmit={deficienciaForm.handleSubmit(onDeficienciaSubmit)} className="space-y-6">
                      <FormField
                        control={deficienciaForm.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da deficiência</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Ex: Paraplegia, Surdez, Cegueira..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={deficienciaForm.control}
                        name="tipos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipos de deficiência</FormLabel>
                            <div className="space-y-2">
                              {[
                                { value: "motora", label: "Deficiência motora", icon: <Accessibility className="w-4 h-4" /> },
                                { value: "auditiva", label: "Deficiência auditiva", icon: <Ear className="w-4 h-4" /> },
                                { value: "visual", label: "Deficiência visual", icon: <Eye className="w-4 h-4" /> }
                              ].map((item) => (
                                <div key={item.value} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`deficiencia-${item.value}`}
                                    checked={field.value?.includes(item.value as any)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentValue, item.value]);
                                      } else {
                                        field.onChange(currentValue.filter((v: string) => v !== item.value));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`deficiencia-${item.value}`} className="flex items-center gap-2 cursor-pointer">
                                    {item.icon}
                                    {item.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={deficienciaForm.control}
                        name="barreira"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Selecionar barreira</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="escadas" id="barreira-escadas" />
                                  <label htmlFor="barreira-escadas" className="cursor-pointer">
                                    Escadas
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="ruido-alto" id="barreira-ruido" />
                                  <label htmlFor="barreira-ruido" className="cursor-pointer">
                                    Ruído alto
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="falta-contraste" id="barreira-contraste" />
                                  <label htmlFor="barreira-contraste" className="cursor-pointer">
                                    Falta de contraste
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="piso-irregular" id="barreira-piso" />
                                  <label htmlFor="barreira-piso" className="cursor-pointer">
                                    Piso irregular
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="ausencia-sinal-visual" id="barreira-visual" />
                                  <label htmlFor="barreira-visual" className="cursor-pointer">
                                    Ausência de sinal visual
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="ausencia-sinal-sonoro" id="barreira-sonoro" />
                                  <label htmlFor="barreira-sonoro" className="cursor-pointer">
                                    Ausência de sinal sonoro
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={deficienciaForm.control}
                        name="acessibilidade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Acessibilidade</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="rampa-acesso" id="acess-rampa" />
                                  <label htmlFor="acess-rampa" className="cursor-pointer">
                                    Rampa de acesso
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="interprete-libras" id="acess-libras" />
                                  <label htmlFor="acess-libras" className="cursor-pointer">
                                    Intérprete de Libras
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="leitor-tela" id="acess-leitor" />
                                  <label htmlFor="acess-leitor" className="cursor-pointer">
                                    Leitor de tela
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="elevador" id="acess-elevador" />
                                  <label htmlFor="acess-elevador" className="cursor-pointer">
                                    Elevador
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="piso-tatil" id="acess-tatil" />
                                  <label htmlFor="acess-tatil" className="cursor-pointer">
                                    Piso tátil
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="sinal-sonoro" id="acess-sinal" />
                                  <label htmlFor="acess-sinal" className="cursor-pointer">
                                    Sinal sonoro
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Cadastrar Deficiência
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Formulário Barreira */}
            {activeForm === 'barreira' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Cadastrar Barreira
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...barreiraForm}>
                    <form onSubmit={barreiraForm.handleSubmit(onBarreiraSubmit)} className="space-y-6">
                      <FormField
                        control={barreiraForm.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da barreira</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Ex: Escadas, Ruído alto, Falta de contraste..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                      <Button type="submit" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Cadastrar Barreira
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Formulário Acessibilidade */}
            {activeForm === 'acessibilidade' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Cadastrar Acessibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...acessibilidadeForm}>
                    <form onSubmit={acessibilidadeForm.handleSubmit(onAcessibilidadeSubmit)} className="space-y-6">
                      <FormField
                        control={acessibilidadeForm.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da acessibilidade</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Ex: Rampa de acesso, Intérprete de Libras, Leitor de tela..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                      <Button type="submit" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Cadastrar Acessibilidade
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;