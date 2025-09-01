import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Accessibility, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useColorblindMode, colorblindOptions } from "@/hooks/use-colorblind-mode";

const Header = () => {
  const { colorblindType, setColorblindType } = useColorblindMode();
  return (
    <header className="w-full bg-card shadow-soft border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Accessibility className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PCDentro</h1>
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
            <Link 
              to="/vagas" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              aria-label="Ver vagas disponíveis"
            >
              Vagas
            </Link>
            <a 
              href="#contato" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              aria-label="Entre em contato"
            >
              Contato
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Colorblind Mode Selector */}
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Daltonismo</span>
              </Label>
              <Select value={colorblindType} onValueChange={setColorblindType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorblindOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Login Button */}
            <Button 
              variant="default" 
              size="sm"
              aria-label="Fazer login"
              asChild
            >
              <Link to="/login">
                <Users className="w-4 h-4" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;