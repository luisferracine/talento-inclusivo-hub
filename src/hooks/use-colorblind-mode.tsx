import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ColorblindModeContextType {
  isColorblindMode: boolean;
  toggleColorblindMode: () => void;
}

const ColorblindModeContext = createContext<ColorblindModeContextType | undefined>(undefined);

export function ColorblindModeProvider({ children }: { children: ReactNode }) {
  const [isColorblindMode, setIsColorblindMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("colorblind-mode");
    if (saved) {
      const savedMode = JSON.parse(saved);
      setIsColorblindMode(savedMode);
      updateColorMode(savedMode);
    }
  }, []);

  const updateColorMode = (enabled: boolean) => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("colorblind-mode");
    } else {
      root.classList.remove("colorblind-mode");
    }
  };

  const toggleColorblindMode = () => {
    const newMode = !isColorblindMode;
    setIsColorblindMode(newMode);
    updateColorMode(newMode);
    localStorage.setItem("colorblind-mode", JSON.stringify(newMode));
  };

  return (
    <ColorblindModeContext.Provider value={{ isColorblindMode, toggleColorblindMode }}>
      {children}
    </ColorblindModeContext.Provider>
  );
}

export function useColorblindMode() {
  const context = useContext(ColorblindModeContext);
  if (context === undefined) {
    throw new Error("useColorblindMode must be used within a ColorblindModeProvider");
  }
  return context;
}