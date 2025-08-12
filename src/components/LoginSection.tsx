import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Building2, Mail, Lock, ArrowRight, UserPlus, PlusCircle } from "lucide-react";

const LoginSection = () => {
  return (
    <section id="login" className="py-16 bg-gradient-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Acesse sua conta
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entre na plataforma para acessar oportunidades ou encontrar talentos incríveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Login PCD */}
          <Card className="shadow-card border-border hover:shadow-hover transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">Área PCD</CardTitle>
              <CardDescription className="text-muted-foreground">
                Acesse sua conta para gerenciar seu currículo e encontrar oportunidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-pcd" className="text-sm font-medium text-foreground">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email-pcd"
                    type="email" 
                    placeholder="seu@email.com"
                    className="pl-10 h-12"
                    aria-describedby="email-pcd-desc"
                  />
                </div>
                <span id="email-pcd-desc" className="sr-only">
                  Digite seu endereço de e-mail para acessar sua conta
                </span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-pcd" className="text-sm font-medium text-foreground">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password-pcd"
                    type="password" 
                    placeholder="Sua senha"
                    className="pl-10 h-12"
                    aria-describedby="password-pcd-desc"
                  />
                </div>
                <span id="password-pcd-desc" className="sr-only">
                  Digite sua senha para acessar sua conta
                </span>
              </div>

              <Button 
                className="w-full h-12" 
                variant="default"
                aria-label="Entrar na área PCD"
              >
                Entrar
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="text-center pt-4 space-y-2">
                <Button 
                  variant="ghost" 
                  className="text-sm text-slate-600 hover:text-primary bg-transparent hover:bg-transparent"
                  aria-label="Recuperar senha da conta PCD"
                >
                  Esqueci minha senha
                </Button>
                <div className="flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    className="text-sm text-primary hover:text-secondary bg-transparent hover:bg-transparent"
                    aria-label="Criar nova conta PCD"
                  >
                    <UserPlus className="w-4 h-4" />
                    Criar conta PCD
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login Empresa */}
          <Card className="shadow-card border-border hover:shadow-hover transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl text-foreground">Área Empresa</CardTitle>
              <CardDescription className="text-muted-foreground">
                Acesse sua conta para gerenciar vagas e encontrar candidatos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-empresa" className="text-sm font-medium text-foreground">
                  E-mail Corporativo
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email-empresa"
                    type="email" 
                    placeholder="empresa@dominio.com"
                    className="pl-10 h-12"
                    aria-describedby="email-empresa-desc"
                  />
                </div>
                <span id="email-empresa-desc" className="sr-only">
                  Digite o e-mail corporativo da sua empresa
                </span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-empresa" className="text-sm font-medium text-foreground">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password-empresa"
                    type="password" 
                    placeholder="Sua senha"
                    className="pl-10 h-12"
                    aria-describedby="password-empresa-desc"
                  />
                </div>
                <span id="password-empresa-desc" className="sr-only">
                  Digite a senha da sua conta empresarial
                </span>
              </div>

              <Button 
                className="w-full h-12" 
                variant="secondary"
                aria-label="Entrar na área empresarial"
              >
                Entrar
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="text-center pt-4 space-y-2">
                <Button 
                  variant="ghost" 
                  className="text-sm text-slate-600 hover:text-primary bg-transparent hover:bg-transparent"
                  aria-label="Recuperar senha da conta empresarial"
                >
                  Esqueci minha senha
                </Button>
                <div className="flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    className="text-sm text-secondary hover:text-primary bg-transparent hover:bg-transparent"
                    aria-label="Cadastrar nova empresa"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Cadastrar Empresa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;