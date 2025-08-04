import { Button } from "@/components/ui/button";
import { Users, Building2, Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-card shadow-soft border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">InclusãoPCD</h1>
              <p className="text-xs text-muted-foreground">Conectando talentos</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#home" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              aria-label="Ir para página inicial"
            >
              Início
            </a>
            <a 
              href="#sobre" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              aria-label="Sobre nós"
            >
              Sobre
            </a>
            <a 
              href="#vagas" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              aria-label="Ver vagas disponíveis"
            >
              Vagas
            </a>
            <a 
              href="#contato" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              aria-label="Entre em contato"
            >
              Contato
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex"
              aria-label="Login para pessoas com deficiência"
            >
              <Users className="w-4 h-4" />
              Login PCD
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              aria-label="Login para empresas"
            >
              <Building2 className="w-4 h-4" />
              Login Empresa
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;