import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Users, Building2, ArrowLeft, Mail, Lock, User, MapPin, Phone, Calendar, CreditCard, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useColorblindMode } from "@/hooks/use-colorblind-mode";

// Schemas de validação
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const pcdSignupSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

const empresaSignupSchema = z.object({
  companyName: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  phone: z.string().min(10, "Telefone inválido"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

const resetPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

const Login = () => {
  const [activeTab, setActiveTab] = useState("pcd");
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const { colorblindType } = useColorblindMode();

  // Forms
  const pcdLoginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const empresaLoginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const pcdSignupForm = useForm<z.infer<typeof pcdSignupSchema>>({
    resolver: zodResolver(pcdSignupSchema),
  });


  const empresaSignupForm = useForm<z.infer<typeof empresaSignupSchema>>({
    resolver: zodResolver(empresaSignupSchema),
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Handlers
  const onPcdLogin = (values: z.infer<typeof loginSchema>) => {
    console.log("PCD Login:", values);
    toast.success("Login realizado com sucesso!");
  };

  const onEmpresaLogin = (values: z.infer<typeof loginSchema>) => {
    console.log("Empresa Login:", values);
    toast.success("Login realizado com sucesso!");
  };

  const onPcdSignup = (values: z.infer<typeof pcdSignupSchema>) => {
    console.log("PCD Signup:", values);
    toast.success("Cadastro realizado com sucesso!");
  };

  const onEmpresaSignup = (values: z.infer<typeof empresaSignupSchema>) => {
    console.log("Empresa Signup:", values);
    toast.success("Cadastro realizado com sucesso!");
  };

  const onResetPassword = (values: z.infer<typeof resetPasswordSchema>) => {
    console.log("Reset Password:", values);
    toast.success("E-mail de redefinição enviado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {mode === "login" ? "Fazer Login" : mode === "signup" ? "Criar Conta" : "Redefinir Senha"}
            </CardTitle>
            <CardDescription>
              {mode === "login" 
                ? "Escolha seu tipo de conta para continuar"
                : mode === "signup" 
                ? "Preencha os dados para criar sua conta"
                : "Digite seu email para receber as instruções"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mode === "reset" ? (
              <div className="space-y-4">
                <Form {...resetPasswordForm}>
                  <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-4">
                    <FormField
                      control={resetPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-gradient-primary hover:bg-gradient-hover text-white font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300 border-0" size="lg" variant="hero">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar email de redefinição
                    </Button>
                  </form>
                </Form>
                
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Lembrou da senha?{" "}
                    <button 
                      onClick={() => setMode("login")}
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Voltar ao login
                    </button>
                  </span>
                </div>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pcd" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    PCD
                  </TabsTrigger>
                  <TabsTrigger value="empresa" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Empresa
                  </TabsTrigger>
                </TabsList>

              <TabsContent value="pcd" className="space-y-4 mt-6">
                {mode === "login" ? (
                  <Form {...pcdLoginForm}>
                    <form onSubmit={pcdLoginForm.handleSubmit(onPcdLogin)} className="space-y-4">
                      <FormField
                        control={pcdLoginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="seu.email@exemplo.com"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={pcdLoginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-gradient-primary hover:bg-gradient-hover text-white font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300 border-0" size="lg" variant="hero">
                        <Users className="w-4 h-4 mr-2" />
                        Entrar como PCD
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...pcdSignupForm}>
                    <form onSubmit={pcdSignupForm.handleSubmit(onPcdSignup)} className="space-y-4">
                      <FormField
                        control={pcdSignupForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  placeholder="Seu nome completo"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={pcdSignupForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder="(11) 99999-9999"
                                    className="pl-10"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={pcdSignupForm.control}
                          name="cpf"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CPF</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <CreditCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder="000.000.000-00"
                                    className="pl-10"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={pcdSignupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="seu.email@exemplo.com"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={pcdSignupForm.control}
                          name="birthDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data de nascimento</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    type="date"
                                    className="pl-10"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={pcdSignupForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder="Sua cidade"
                                    className="pl-10"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={pcdSignupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={pcdSignupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                      <Button type="submit" className="w-full" size="lg">
                        <Users className="w-4 h-4 mr-2" />
                        Criar conta PCD
                      </Button>
                    </form>
                  </Form>
                )}
                
                <div className="text-center">
                  <button 
                    onClick={() => setMode("reset")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
                    <button 
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {mode === "login" ? "Cadastre-se" : "Fazer login"}
                    </button>
                  </span>
                </div>
              </TabsContent>

              <TabsContent value="empresa" className="space-y-4 mt-6">
                {mode === "login" ? (
                  <Form {...empresaLoginForm}>
                    <form onSubmit={empresaLoginForm.handleSubmit(onEmpresaLogin)} className="space-y-4">
                      <FormField
                        control={empresaLoginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email corporativo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="contato@suaempresa.com"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={empresaLoginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-gradient-primary hover:bg-gradient-hover text-white font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300 border-0" size="lg" variant="hero">
                        <Building2 className="w-4 h-4 mr-2" />
                        Entrar como Empresa
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...empresaSignupForm}>
                    <form onSubmit={empresaSignupForm.handleSubmit(onEmpresaSignup)} className="space-y-4">
                      <FormField
                        control={empresaSignupForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da empresa</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  placeholder="Nome da sua empresa"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={empresaSignupForm.control}
                        name="cnpj"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CNPJ</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="00.000.000/0000-00"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={empresaSignupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email corporativo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="contato@suaempresa.com"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={empresaSignupForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder="(11) 99999-9999"
                                    className="pl-10"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={empresaSignupForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder="Cidade da empresa"
                                    className="pl-10"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={empresaSignupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={empresaSignupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" size="lg" variant="secondary">
                        <Building2 className="w-4 h-4 mr-2" />
                        Cadastrar empresa
                      </Button>
                    </form>
                  </Form>
                )}
                
                <div className="text-center">
                  <button 
                    onClick={() => setMode("reset")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {mode === "login" ? "Não tem conta empresarial?" : "Já tem conta?"}{" "}
                    <button 
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {mode === "login" ? "Cadastre sua empresa" : "Fazer login"}
                    </button>
                  </span>
                </div>
              </TabsContent>
            </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;