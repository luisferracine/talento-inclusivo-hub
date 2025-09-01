import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AccessibilitySettings {
  fontesGrandes: boolean;
  modoDaltonismo: boolean;
  leitorTelaOtimizado: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = "accessibility-settings";

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      fontesGrandes: false,
      modoDaltonismo: false,
      leitorTelaOtimizado: false,
    };
  });

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Aplicar configurações de acessibilidade ao documento
  useEffect(() => {
    const root = document.documentElement;
    
    // Fontes grandes
    if (settings.fontesGrandes) {
      root.classList.add("accessibility-large-fonts");
    } else {
      root.classList.remove("accessibility-large-fonts");
    }

    // Modo daltonismo
    if (settings.modoDaltonismo) {
      root.classList.add("accessibility-colorblind");
    } else {
      root.classList.remove("accessibility-colorblind");
    }

    // Leitor de tela otimizado
    if (settings.leitorTelaOtimizado) {
      root.classList.add("accessibility-screen-reader");
      root.setAttribute("data-screen-reader", "true");
    } else {
      root.classList.remove("accessibility-screen-reader");
      root.removeAttribute("data-screen-reader");
    }
  }, [settings]);

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}