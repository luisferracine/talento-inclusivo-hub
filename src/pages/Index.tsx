import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LoginSection from "@/components/LoginSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <LoginSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
