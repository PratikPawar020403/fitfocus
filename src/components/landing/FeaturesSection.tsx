
import React from "react";
import { Calculator, BarChart3, HeartPulse } from "lucide-react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-on-scroll">Powerful Health Tools</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto opacity-0 animate-on-scroll">
            Our suite of calculators and visualizations help you track what matters most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl hover-lift opacity-0 animate-on-scroll">
            <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Calculator className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">14+ Health Calculators</h3>
            <p className="text-muted-foreground">
              From BMI to body fat percentage, our calculators give you accurate, real-time insights.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl hover-lift opacity-0 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <BarChart3 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Dashboard</h3>
            <p className="text-muted-foreground">
              Track all your health metrics in one place with intuitive visualizations and progress indicators.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl hover-lift opacity-0 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <HeartPulse className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
            <p className="text-muted-foreground">
              Get tailored recommendations based on your metrics and health goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
