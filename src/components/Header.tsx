import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Users, Building2, Accessibility, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useColorblindMode } from "@/hooks/use-colorblind-mode";

const Header = () => {
  const { isColorblindMode, toggleColorblindMode } = useColorblindMode();
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
              <h1 className="text-lg sm:text-xl font-bold text-foreground">PCDentro</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Conectando talentos</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Colorblind Mode Switch */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Label htmlFor="colorblind-mode-header" className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">Daltonismo</span>
              </Label>
              <Switch
                id="colorblind-mode-header"
                checked={isColorblindMode}
                onCheckedChange={toggleColorblindMode}
              />
            </div>
            
            {/* Login Button */}
            <Button 
              variant="default" 
              size="sm"
              aria-label="Fazer login"
              asChild
              className="text-xs sm:text-sm px-2 sm:px-4"
            >
              <Link to="/login">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Login</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;