import { Heart, Accessibility } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Accessibility className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">PCDentro</h3>
                <p className="text-xs text-muted-foreground">Conectando talentos</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pr-4">
              Transformando o mercado de trabalho através da inclusão e diversidade.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Links Rápidos</h4>
            <nav className="space-y-1">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Início
              </a>
              <a href="#sobre" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre Nós
              </a>
              <a href="#vagas" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Vagas
              </a>
            </nav>
          </div>

          {/* Para Candidatos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Candidatos</h4>
            <nav className="space-y-1">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cadastrar Currículo
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Buscar Vagas
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dicas de Carreira
              </a>
            </nav>
          </div>

          {/* Para Empresas */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Empresas</h4>
            <nav className="space-y-1">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cadastrar Empresa
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Publicar Vagas
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Encontrar Talentos
              </a>
            </nav>
          </div>
        </div>

        <hr className="border-border mb-4" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 PCDentro. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Acessibilidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;