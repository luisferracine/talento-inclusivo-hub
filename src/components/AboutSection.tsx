import { Card, CardContent } from "@/components/ui/card";
import { Accessibility, Target, Heart, Users, Building2, Zap, Shield, Globe } from "lucide-react";
const AboutSection = () => {
  const features = [{
    icon: Target,
    title: "Facilitar o Acesso",
    description: "Conectamos pessoas com deficiência a oportunidades reais de trabalho, eliminando barreiras e preconceitos."
  }, {
    icon: Users,
    title: "Base de Currículos",
    description: "Oferecemos uma plataforma acessível onde empresas podem encontrar talentos diversos de forma eficiente."
  }, {
    icon: Heart,
    title: "Promover Inclusão",
    description: "Fomentamos um ambiente de trabalho mais diverso, justo e inclusivo para todos."
  }, {
    icon: Shield,
    title: "Ambiente Seguro",
    description: "Garantimos um espaço protegido e respeitoso para candidatos e empresas se conectarem."
  }, {
    icon: Zap,
    title: "Tecnologia Acessível",
    description: "Nossa plataforma foi desenvolvida seguindo as melhores práticas de acessibilidade digital."
  }, {
    icon: Globe,
    title: "Impacto Social",
    description: "Contribuímos para uma sociedade mais inclusiva, onde o talento é valorizado acima de tudo."
  }];
  return <section id="sobre" className="py-16 bg-background">
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
        <div className="max-w-6xl mx-auto mb-20">
          
        </div>

        {/* Features grid */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            
            
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="shadow-card border-border hover:shadow-hover transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;