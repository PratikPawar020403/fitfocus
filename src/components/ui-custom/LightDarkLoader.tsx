
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

  // Use Tailwind classes and CSS variables for consistent colors across themes
  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none bg-background transition-opacity duration-300 ${transitioning ? 'opacity-50' : 'opacity-0'} ${className}`}
      aria-hidden="true"
    />
  );
};

export default LightDarkLoader;
