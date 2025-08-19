import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Building2, Accessibility } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-background to-accent overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-20 h-20 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-secondary rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-accent-foreground rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft mb-6 border border-border">
            <Accessibility className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Plataforma de Inclusão</span>
          </div>

          {/* Main heading */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Conectando{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              talentos diversos
            </span>{" "}
            a oportunidades reais
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Uma plataforma inclusiva que aproxima pessoas com deficiência de empresas 
            comprometidas com a diversidade, criando um futuro mais justo e igualitário.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center mb-12 px-4">
            <Button 
              variant="hero" 
              size="default"
              className="w-full sm:w-auto bg-gradient-primary hover:bg-gradient-hover text-white font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300 border-0 text-sm sm:text-base"
              aria-label="Cadastrar currículo como pessoa com deficiência"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Sou PCD - Cadastrar Currículo</span>
              <span className="sm:hidden">PCD - Cadastrar</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <Button 
              variant="hero" 
              size="default"
              className="w-full sm:w-auto bg-gradient-primary hover:bg-gradient-hover text-white font-semibold shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300 border-0 text-sm sm:text-base"
              aria-label="Cadastrar empresa para buscar talentos"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Sou Empresa - Buscar Talentos</span>
              <span className="sm:hidden">Empresa - Buscar</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 px-4">
            <div className="bg-card p-4 sm:p-6 rounded-xl shadow-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Currículos Cadastrados</div>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-xl shadow-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold text-secondary mb-2">200+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Empresas Parceiras</div>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-xl shadow-card border border-border">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Contratações Realizadas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;