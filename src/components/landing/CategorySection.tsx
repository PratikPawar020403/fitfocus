
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CategorySection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/30 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-on-scroll">Comprehensive Health Metrics</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto opacity-0 animate-on-scroll">
            Explore our calculator categories designed to cover all aspects of your health.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-xl text-center hover-lift opacity-0 animate-on-scroll">
            <h3 className="text-2xl font-semibold mb-4">Body Composition</h3>
            <p className="text-muted-foreground mb-6">
              Calculate BMI, body fat percentage, lean body mass, and ideal weight.
            </p>
            <Button variant="outline" className="btn-interactive" asChild>
              <NavLink to="/calculators" className="flex items-center">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </NavLink>
            </Button>
          </div>
          
          <div className="glass-panel p-8 rounded-xl text-center hover-lift opacity-0 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-semibold mb-4">Nutrition</h3>
            <p className="text-muted-foreground mb-6">
              Calculate daily calories, macronutrients, and water intake requirements.
            </p>
            <Button variant="outline" className="btn-interactive" asChild>
              <NavLink to="/calculators" className="flex items-center">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </NavLink>
            </Button>
          </div>
          
          <div className="glass-panel p-8 rounded-xl text-center hover-lift opacity-0 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold mb-4">Wellness</h3>
            <p className="text-muted-foreground mb-6">
              Assess stress levels, sleep quality, and other wellness indicators.
            </p>
            <Button variant="outline" className="btn-interactive" asChild>
              <NavLink to="/calculators" className="flex items-center">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
