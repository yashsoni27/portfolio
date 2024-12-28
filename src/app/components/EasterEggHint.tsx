"use client";
import { useEasterEggs } from '../context/EasterEggContext';
import { useState, useEffect } from 'react';

export default function EasterEggHint() {
  const { eggs } = useEasterEggs();
  const [currentHint, setCurrentHint] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show hints for undiscovered eggs periodically
    const interval = setInterval(() => {
      const undiscovered = eggs.filter(egg => !egg.discovered);
      if (undiscovered.length > 0) {
        const randomEgg = undiscovered[Math.floor(Math.random() * undiscovered.length)];
        setCurrentHint(randomEgg.hint);
        setIsVisible(true);
        
        // Hide hint after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }
    }, 30000); // Show a new hint every 30 seconds

    return () => clearInterval(interval);
  }, [eggs]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-xs bg-black/80 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500">
      <p className="text-sm italic">💡 {currentHint}</p>
    </div>
  );
} 