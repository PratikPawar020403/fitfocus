
import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface LightDarkLoaderProps {
  className?: string;
}

const LightDarkLoader: React.FC<LightDarkLoaderProps> = ({ className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [prevTheme, setPrevTheme] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle smooth transition between themes
  useEffect(() => {
    if (!mounted) return;
    
    if (prevTheme && prevTheme !== theme) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
    
    setPrevTheme(theme);
  }, [theme, mounted, prevTheme]);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) return null;

  if (!transitioning) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 ${className}`}
      style={{
        backgroundColor: theme === 'dark' ? '#171717' : '#ffffff',
        opacity: transitioning ? 0.5 : 0,
      }}
      aria-hidden="true"
    />
  );
};

export default LightDarkLoader;
