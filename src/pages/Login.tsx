import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, ArrowLeft, Eye, EyeOff, Accessibility } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCompany, setShowPasswordCompany] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header simplificado */}
      <header className="w-full bg-card shadow-soft border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Accessibility className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PCDentro</h1>
                <p className="text-xs text-muted-foreground">Conectando talentos</p>
              </div>
            </Link>
            
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="pcd" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="pcd" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Login PCD
              </TabsTrigger>
              <TabsTrigger value="empresa" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Login Empresa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pcd">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Bem-vindo de volta!</CardTitle>
                  <CardDescription>
                    Faça login para acessar sua área de candidatos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-pcd">E-mail</Label>
                    <Input
                      id="email-pcd"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-pcd">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password-pcd"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        required
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
                  </div>
                  <Button className="w-full" size="lg">
                    Entrar
                  </Button>
                  <div className="text-center space-y-2">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Esqueceu sua senha?
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Não tem conta?{" "}
                      <a href="#" className="text-primary hover:underline">
                        Cadastre-se aqui
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="empresa">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Portal Empresas</CardTitle>
                  <CardDescription>
                    Acesse sua área para gerenciar vagas e candidatos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-empresa">E-mail corporativo</Label>
                    <Input
                      id="email-empresa"
                      type="email"
                      placeholder="empresa@exemplo.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-empresa">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password-empresa"
                        type={showPasswordCompany ? "text" : "password"}
                        placeholder="Digite sua senha"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPasswordCompany(!showPasswordCompany)}
                      >
                        {showPasswordCompany ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Entrar
                  </Button>
                  <div className="text-center space-y-2">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Esqueceu sua senha?
                    </a>
                    <p className="text-sm text-muted-foreground">
                      Primeira vez aqui?{" "}
                      <a href="#" className="text-primary hover:underline">
                        Cadastre sua empresa
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;