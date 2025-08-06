import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("pcd");

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
            <CardTitle className="text-2xl font-bold">Fazer Login</CardTitle>
            <CardDescription>
              Escolha seu tipo de conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <div className="space-y-2">
                  <Label htmlFor="pcd-email">Email</Label>
                  <Input
                    id="pcd-email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pcd-password">Senha</Label>
                  <Input
                    id="pcd-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                  />
                </div>
                <Button className="w-full" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Entrar como PCD
                </Button>
                <div className="text-center">
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <a 
                      href="#" 
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Cadastre-se
                    </a>
                  </span>
                </div>
              </TabsContent>

              <TabsContent value="empresa" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="empresa-email">Email corporativo</Label>
                  <Input
                    id="empresa-email"
                    type="email"
                    placeholder="contato@suaempresa.com"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa-password">Senha</Label>
                  <Input
                    id="empresa-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                  />
                </div>
                <Button className="w-full" size="lg">
                  <Building2 className="w-4 h-4 mr-2" />
                  Entrar como Empresa
                </Button>
                <div className="text-center">
                  <a 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Não tem conta empresarial?{" "}
                    <a 
                      href="#" 
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Cadastre sua empresa
                    </a>
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;