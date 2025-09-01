import { Card, CardContent } from "@/components/ui/card";
import { Accessibility, Target, Heart, Users, Building2, Zap, Shield, Globe } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Facilitar o Acesso",
      description: "Conectamos pessoas com deficiência a oportunidades reais de trabalho, eliminando barreiras e preconceitos."
    },
    {
      icon: Users,
      title: "Base de Currículos",
      description: "Oferecemos uma plataforma acessível onde empresas podem encontrar talentos diversos de forma eficiente."
    },
    {
      icon: Heart,
      title: "Promover Inclusão",
      description: "Fomentamos um ambiente de trabalho mais diverso, justo e inclusivo para todos."
    },
    {
      icon: Shield,
      title: "Ambiente Seguro",
      description: "Garantimos um espaço protegido e respeitoso para candidatos e empresas se conectarem."
    },
    {
      icon: Zap,
      title: "Tecnologia Acessível",
      description: "Nossa plataforma foi desenvolvida seguindo as melhores práticas de acessibilidade digital."
    },
    {
      icon: Globe,
      title: "Impacto Social",
      description: "Contribuímos para uma sociedade mais inclusiva, onde o talento é valorizado acima de tudo."
    }
  ];

  return (
    <section id="sobre" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Accessibility className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nossa Missão</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            O que fazemos
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Somos uma plataforma dedicada a conectar pessoas com deficiência ao mercado de trabalho, 
            criando pontes entre talentos únicos e empresas que valorizam a diversidade e a inclusão.
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Transformando o mercado de trabalho
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Acreditamos que a diversidade é uma força motriz para a inovação e o crescimento. 
              Nossa plataforma não apenas conecta candidatos e empresas, mas também educa e 
              sensibiliza o mercado sobre a importância da inclusão.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Com ferramentas acessíveis e uma interface pensada para todos, garantimos que 
              cada pessoa tenha a oportunidade de mostrar seu potencial e encontrar um ambiente 
              de trabalho onde possa prosperar.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-foreground">200+ Empresas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">1000+ Candidatos</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card p-8 rounded-2xl shadow-card border border-border">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-xs text-muted-foreground">Taxa de Satisfação</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">15 dias</div>
                  <div className="text-xs text-muted-foreground">Tempo Médio</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground">Contratações</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground">Segurança</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-card border-border hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground mb-3">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;