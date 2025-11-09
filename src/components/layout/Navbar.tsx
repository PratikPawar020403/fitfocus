import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, ActivityIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggler from "@/components/ui-custom/ThemeToggler";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white dark:bg-background border-bottom border-border/60 shadow-md transition-all duration-300",
        isScrolled ? "shadow-lg" : "shadow-md"
      )}
      style={{ minHeight: 64 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo Far Left */}
        <div className="flex items-center flex-shrink-0" style={{ minWidth: 0 }}>
          <NavLink to="/" className="flex items-center gap-2 text-decoration-none">
            <ActivityIcon className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground">HealthMetrics</span>
          </NavLink>
        </div>
        {/* Centered Nav Links - Desktop Only */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "font-medium px-2 py-1 rounded transition-colors text-lg",
                isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary/80 text-gray-700 dark:text-gray-200"
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "font-medium px-2 py-1 rounded transition-colors text-lg",
                isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary/80 text-gray-700 dark:text-gray-200"
              )
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/calculators"
            className={({ isActive }) =>
              cn(
                "font-medium px-2 py-1 rounded transition-colors text-lg",
                isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary/80 text-gray-700 dark:text-gray-200"
              )
            }
          >
            Calculators
          </NavLink>
        </nav>
        {/* Theme Toggle and Get Started Button Far Right */}
        <div className="flex items-center flex-shrink-0 gap-4">
          <ThemeToggler className="hidden md:flex shadow-sm" />
          <Button asChild className="hidden md:inline-block font-semibold px-6 py-2 rounded-full shadow-sm bg-primary hover:bg-primary/90 text-white text-base transition-all">
            <NavLink to="/dashboard">Get Started</NavLink>
          </Button>
          {/* Hamburger Menu - Mobile Only */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-2 p-2 rounded-full border border-border/40 shadow-sm bg-white/90 dark:bg-background/90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            style={{ zIndex: 1051 }}
          >
            {isOpen ? (
              <XIcon className="h-7 w-7" />
            ) : (
              <MenuIcon className="h-7 w-7" />
            )}
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden w-full bg-white dark:bg-background rounded-b shadow-lg transition-all duration-300 px-4",
          isOpen ? "block" : "hidden"
        )}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1050,
          borderTop: '1px solid var(--border)',
          transition: 'all 0.25s cubic-bezier(.4,0,.2,1)'
        }}
      >
        <div className="flex flex-col gap-2 py-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "px-4 py-3 rounded text-lg font-medium flex items-center transition-all",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/80 text-gray-700 dark:text-gray-200"
              )
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "px-4 py-3 rounded text-lg font-medium flex items-center transition-all",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/80 text-gray-700 dark:text-gray-200"
              )
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/calculators"
            className={({ isActive }) =>
              cn(
                "px-4 py-3 rounded text-lg font-medium flex items-center transition-all",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/80 text-gray-700 dark:text-gray-200"
              )
            }
            onClick={() => setIsOpen(false)}
          >
            Calculators
          </NavLink>
          <div className="mt-2 flex justify-center">
            <ThemeToggler className="md:hidden shadow-sm" />
          </div>
          <Button className="mt-2 w-full py-3 text-lg rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md transition-all" asChild>
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>Get Started</NavLink>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
