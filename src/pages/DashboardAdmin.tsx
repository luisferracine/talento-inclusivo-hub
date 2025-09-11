import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Users, Eye, Ear, Accessibility, Plus, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Schemas para os formulários
const deficienciaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  tipo: z.enum(["motora", "auditiva", "visual"], {
    required_error: "Selecione um tipo de deficiência",
  }),
});

const barreiraSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  tipo: z.enum(["motora", "auditiva", "visual"], {
    required_error: "Selecione um tipo de barreira",
  }),
});

const acessibilidadeSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  tipo: z.enum(["motora", "auditiva", "visual"], {
    required_error: "Selecione um tipo de acessibilidade",
  }),
});

const DashboardAdmin = () => {
  const [activeForm, setActiveForm] = useState<'deficiencia' | 'barreira' | 'acessibilidade'>('deficiencia');

  // Forms
  const deficienciaForm = useForm<z.infer<typeof deficienciaSchema>>({
    resolver: zodResolver(deficienciaSchema),
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
                        name="tipo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de deficiência</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="motora" id="deficiencia-motora" />
                                  <label htmlFor="deficiencia-motora" className="flex items-center gap-2 cursor-pointer">
                                    <Accessibility className="w-4 h-4" />
                                    Deficiência motora
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="auditiva" id="deficiencia-auditiva" />
                                  <label htmlFor="deficiencia-auditiva" className="flex items-center gap-2 cursor-pointer">
                                    <Ear className="w-4 h-4" />
                                    Deficiência auditiva
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="visual" id="deficiencia-visual" />
                                  <label htmlFor="deficiencia-visual" className="flex items-center gap-2 cursor-pointer">
                                    <Eye className="w-4 h-4" />
                                    Deficiência visual
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

                      <FormField
                        control={barreiraForm.control}
                        name="tipo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de barreira</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="motora" id="barreira-motora" />
                                  <label htmlFor="barreira-motora" className="flex items-center gap-2 cursor-pointer">
                                    <Accessibility className="w-4 h-4" />
                                    Deficiência motora
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="auditiva" id="barreira-auditiva" />
                                  <label htmlFor="barreira-auditiva" className="flex items-center gap-2 cursor-pointer">
                                    <Ear className="w-4 h-4" />
                                    Deficiência auditiva
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="visual" id="barreira-visual" />
                                  <label htmlFor="barreira-visual" className="flex items-center gap-2 cursor-pointer">
                                    <Eye className="w-4 h-4" />
                                    Deficiência visual
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

                      <FormField
                        control={acessibilidadeForm.control}
                        name="tipo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de acessibilidade</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="motora" id="acessibilidade-motora" />
                                  <label htmlFor="acessibilidade-motora" className="flex items-center gap-2 cursor-pointer">
                                    <Accessibility className="w-4 h-4" />
                                    Deficiência motora
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="auditiva" id="acessibilidade-auditiva" />
                                  <label htmlFor="acessibilidade-auditiva" className="flex items-center gap-2 cursor-pointer">
                                    <Ear className="w-4 h-4" />
                                    Deficiência auditiva
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="visual" id="acessibilidade-visual" />
                                  <label htmlFor="acessibilidade-visual" className="flex items-center gap-2 cursor-pointer">
                                    <Eye className="w-4 h-4" />
                                    Deficiência visual
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