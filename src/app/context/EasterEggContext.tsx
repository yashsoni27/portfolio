"use client";
import { createContext, useContext, useState, useEffect } from 'react';

type EasterEgg = {
  id: string;
  discovered: boolean;
  hint: string;
};

const initialEggs: EasterEgg[] = [
  // { id: 'shake', discovered: false, hint: "Feeling shaky about these tech skills?" },
  { id: 'longpress', discovered: false, hint: "Some names hold secrets when you hold them..." },
  { id: 'doubletap', discovered: false, hint: "Show some love to the avatar!" },
  { id: 'terminal', discovered: false, hint:"Sometimes you gotta open up terminal(VSCode style) no matter what!"},
  { id: 'konami', discovered: false, hint:"↑↑↓↓←→←→ba Gotta press the keys right!"},
  // { id: 'swipe', discovered: false, hint: "↑↓←→ Not all gestures are random" },
];

const EasterEggContext = createContext<{
  eggs: EasterEgg[];
  markDiscovered: (id: string) => void;
}>({ eggs: initialEggs, markDiscovered: () => {} });

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [eggs, setEggs] = useState(initialEggs);

  // Load discovered eggs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('discoveredEggs');
    if (saved) {
      setEggs(prev => prev.map(egg => ({
        ...egg,
        discovered: JSON.parse(saved).includes(egg.id)
      })));
    }
  }, []);

  const markDiscovered = (id: string) => {
    setEggs(prev => {
      const newEggs = prev.map(egg => 
        egg.id === id ? { ...egg, discovered: true } : egg
      );
      // Save to localStorage
      localStorage.setItem('discoveredEggs', 
        JSON.stringify(newEggs.filter(e => e.discovered).map(e => e.id))
      );
      return newEggs;
    });
  };

  return (
    <EasterEggContext.Provider value={{ eggs, markDiscovered }}>
      {children}
    </EasterEggContext.Provider>
  );
}

export const useEasterEggs = () => useContext(EasterEggContext); 