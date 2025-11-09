
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CalculatorCardItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

const CalculatorCardItem: React.FC<CalculatorCardItemProps> = ({
  title,
  description,
  icon: Icon,
  path,
}) => {
  return (
<<<<<<< HEAD
    <div className="glass-panel p-3 sm:p-3 rounded-lg text-center hover-lift h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-2 sm:mb-2">
          <Icon className="h-6 w-6 sm:h-6 sm:w-6 text-primary" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-2 sm:mb-2">
=======
    <div className="glass-panel p-8 rounded-xl text-center hover-lift h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6">
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
          {description}
        </p>
      </div>
      <Button variant="outline" className="btn-interactive w-full justify-center" asChild>
        <NavLink to={path} className="flex items-center">
          Try it <ArrowRight className="ml-2 h-4 w-4" />
        </NavLink>
      </Button>
    </div>
  );
};

export default CalculatorCardItem;
