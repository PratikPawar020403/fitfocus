import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ActivityIcon } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4 md:px-6 bg-gradient-to-b from-primary/5 to-background transition-colors duration-300">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-accent/30 rounded-full mb-4 animate-fade-in">
            <ActivityIcon className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Smarter Health, Happier Life</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
            Welcome to HealthMetrics
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
            Your all-in-one platform to track, analyze, and improve your health. Discover personalized calculators, insightful dashboards, and actionable tips—all designed to help you live your healthiest life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-bottom" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="w-full sm:w-auto btn-interactive" asChild>
              <NavLink to="/dashboard">Start Your Journey</NavLink>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto btn-interactive" asChild>
              <NavLink to="/calculators">Explore Calculators</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
