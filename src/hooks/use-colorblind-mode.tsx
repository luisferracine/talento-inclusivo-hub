import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ColorblindType = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'protanomalia' | 'deuteranomalia' | 'tritanomalia';

export const colorblindOptions = [
  { value: 'none', label: 'Normal' },
  { value: 'protanopia', label: 'Protanopia (sem vermelho)' },
  { value: 'deuteranopia', label: 'Deuteranopia (sem verde)' },
  { value: 'tritanopia', label: 'Tritanopia (sem azul)' },
  { value: 'protanomalia', label: 'Protanomalia (vermelho reduzido)' },
  { value: 'deuteranomalia', label: 'Deuteranomalia (verde reduzido)' },
  { value: 'tritanomalia', label: 'Tritanomalia (azul reduzido)' }
] as const;

interface ColorblindModeContextType {
  colorblindType: ColorblindType;
  setColorblindType: (type: ColorblindType) => void;
}

const ColorblindModeContext = createContext<ColorblindModeContextType | undefined>(undefined);

export function ColorblindModeProvider({ children }: { children: ReactNode }) {
  const [colorblindType, setColorblindTypeState] = useState<ColorblindType>('none');

  useEffect(() => {
    const saved = localStorage.getItem("colorblind-type");
    if (saved) {
      const savedType = saved as ColorblindType;
      setColorblindTypeState(savedType);
      updateColorMode(savedType);
    }
  }, []);

  const updateColorMode = (type: ColorblindType) => {
    const root = document.documentElement;
    // Remove all colorblind classes
    colorblindOptions.forEach(option => {
      if (option.value !== 'none') {
        root.classList.remove(`colorblind-${option.value}`);
      }
    });
    
    // Add the selected colorblind class
    if (type !== 'none') {
      root.classList.add(`colorblind-${type}`);
    }
  };

  const setColorblindType = (type: ColorblindType) => {
    setColorblindTypeState(type);
    updateColorMode(type);
    localStorage.setItem("colorblind-type", type);
  };

  return (
    <ColorblindModeContext.Provider value={{ colorblindType, setColorblindType }}>
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