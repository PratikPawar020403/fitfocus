
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import WilksInfoSection from "./wilks/WilksInfoSection";
import WilksForm from "./wilks/WilksForm";
import { useIsMobile } from "@/hooks/use-mobile";
=======
import WilksInfoSection from "./wilks/WilksInfoSection";
import WilksForm from "./wilks/WilksForm";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggler from "@/components/ui-custom/ThemeToggler";
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b

const WilksCalculator = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
<<<<<<< HEAD
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <NavLink to="/calculators" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calculators
            </NavLink>
          </Button>
          <header className="mb-4 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Wilks Coefficient Calculator</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Calculate your Wilks score to compare strength levels across different body weights and genders.
            </p>
=======
          <header className="mb-4 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Wilks Coefficient Calculator</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Calculate your Wilks score to compare strength levels across different body weights and genders.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <ThemeToggler />
            </div>
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 glass-panel rounded-xl shadow-sm overflow-hidden">
              <Tabs defaultValue="calculator" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 md:mb-8 bg-background/20 backdrop-blur sticky top-0 z-10 border-b">
                  <TabsTrigger value="calculator" className={cn(isMobile ? "py-3" : "", "data-[state=active]:bg-background/40 transition-all duration-300")}>
                    Calculator
                  </TabsTrigger>
                  <TabsTrigger value="info" className={cn(isMobile ? "py-3" : "", "data-[state=active]:bg-background/40 transition-all duration-300")}>
                    Information
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-4 md:p-6">
                  <TabsContent value="calculator" className="mt-0 animate-fade-in">
                    <WilksForm />
                  </TabsContent>
                  
                  <TabsContent value="info" className="mt-0 animate-fade-in">
                    <WilksInfoSection />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            
            <div className="hidden lg:block">
              <div className="glass-panel rounded-xl shadow-sm p-4 md:p-6 animate-fade-in">
                <h3 className="font-semibold text-xl mb-4">Why Use Wilks?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The Wilks Coefficient allows for meaningful comparisons of strength performances between lifters of different body weights and genders.
                </p>
                <div className="bg-primary/10 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-sm mb-2">Pro Tip</h4>
                  <p className="text-xs">
                    A Wilks score above 300 is considered intermediate, above 400 is advanced, and above 500 is elite in competitive powerlifting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default WilksCalculator;
