import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PoliticasTermos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Políticas e Termos
          </h1>
          <p className="text-muted-foreground">
            Informações importantes sobre privacidade, termos de uso e acessibilidade
          </p>
        </div>

        {/* Política de Privacidade */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Política de Privacidade
          </h2>
          
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Coleta de Informações
              </h3>
              <p className="mb-4">
                Coletamos informações pessoais que você nos fornece diretamente ao criar uma conta, 
                preencher formulários ou entrar em contato conosco. Isso inclui nome, e-mail, 
                telefone, informações profissionais e dados sobre deficiências quando relevante 
                para o processo seletivo.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Uso das Informações
              </h3>
              <p className="mb-4">
                Utilizamos suas informações para conectar candidatos PCD com oportunidades de 
                emprego adequadas, melhorar nossos serviços, enviar comunicações relevantes e 
                cumprir obrigações legais relacionadas à inclusão no mercado de trabalho.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Compartilhamento de Dados
              </h3>
              <p className="mb-4">
                Compartilhamos informações apenas com empresas parceiras durante processos 
                seletivos, sempre com seu consentimento explícito. Nunca vendemos ou 
                comercializamos seus dados pessoais.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Seus Direitos
              </h3>
              <p className="mb-4">
                Você tem o direito de acessar, corrigir, excluir ou portar seus dados pessoais. 
                Entre em contato conosco para exercer esses direitos ou esclarecer dúvidas 
                sobre nossa política de privacidade.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Termos de Uso */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Termos de Uso
          </h2>
          
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Aceitação dos Termos
              </h3>
              <p className="mb-4">
                Ao utilizar a plataforma PCDentro, você concorda com estes termos de uso. 
                Se não concordar com algum termo, não utilize nossos serviços.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Uso Adequado da Plataforma
              </h3>
              <p className="mb-4">
                Nossa plataforma deve ser utilizada apenas para fins legítimos de busca de 
                emprego e recrutamento inclusivo. É proibido usar o serviço para atividades 
                discriminatórias, fraudulentas ou que violem direitos de terceiros.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Responsabilidades do Usuário
              </h3>
              <p className="mb-4">
                Você é responsável pela veracidade das informações fornecidas, pela segurança 
                de sua conta e por manter seus dados atualizados. Não nos responsabilizamos 
                por consequências decorrentes de informações incorretas ou desatualizadas.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Limitação de Responsabilidade
              </h3>
              <p className="mb-4">
                O PCDentro facilita conexões entre candidatos e empresas, mas não garante 
                contratações ou resultados específicos. Nossa responsabilidade se limita à 
                prestação do serviço da plataforma.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Acessibilidade */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Compromisso com a Acessibilidade
          </h2>
          
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Nossa Missão
              </h3>
              <p className="mb-4">
                Estamos comprometidos em tornar nossa plataforma acessível a todos os usuários, 
                incluindo pessoas com deficiências visuais, auditivas, motoras e cognitivas.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Recursos de Acessibilidade
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Compatibilidade com leitores de tela</li>
                <li>Navegação por teclado</li>
                <li>Alto contraste e opções para daltonismo</li>
                <li>Textos alternativos em imagens</li>
                <li>Estrutura semântica clara</li>
                <li>Fonte escalável e legível</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Padrões Seguidos
              </h3>
              <p className="mb-4">
                Nossa plataforma segue as diretrizes de acessibilidade WCAG 2.1 AA e está 
                em constante melhoria para atender às melhores práticas de acessibilidade web.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Feedback e Sugestões
              </h3>
              <p className="mb-4">
                Se encontrar barreiras de acessibilidade ou tiver sugestões de melhoria, 
                entre em contato conosco. Seu feedback é essencial para continuarmos 
                aprimorando a inclusão digital.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Contato para Acessibilidade
              </h3>
              <p className="mb-4">
                Para questões relacionadas à acessibilidade, entre em contato através do 
                e-mail: acessibilidade@pcdentro.com.br
              </p>
            </div>
          </div>
        </section>

        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            Última atualização: Janeiro de 2025
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticasTermos;