
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-primary/5 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-on-scroll">Start Your Health Journey Today</h2>
          <p className="text-xl text-muted-foreground mb-8 opacity-0 animate-on-scroll">
            Get instant access to all our health calculators and start tracking your metrics.
          </p>
          <Button size="lg" className="btn-interactive opacity-0 animate-on-scroll" asChild>
            <NavLink to="/dashboard">Go to Dashboard</NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
