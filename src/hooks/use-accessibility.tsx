import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AccessibilitySettings {
  modoDaltonismo: "nenhum" | "protanopia" | "deuteranopia" | "tritanopia" | "protanomalia" | "deuteranomalia" | "tritanomalia";
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
      modoDaltonismo: "nenhum",
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

    // Remover todas as classes de daltonismo anteriores
    root.classList.remove(
      "colorblind-protanopia", 
      "colorblind-deuteranopia", 
      "colorblind-tritanopia",
      "colorblind-protanomalia", 
      "colorblind-deuteranomalia", 
      "colorblind-tritanomalia"
    );

    // Aplicar classe de daltonismo se não for "nenhum"
    if (settings.modoDaltonismo !== "nenhum") {
      root.classList.add(`colorblind-${settings.modoDaltonismo}`);
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