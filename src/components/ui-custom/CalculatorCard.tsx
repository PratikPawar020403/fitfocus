
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  className?: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  className = "",
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <NavLink to={to} className="block h-full" aria-label={`Go to ${title} calculator`}>
      <Card 
        className={cn(
          "health-card overflow-hidden relative group transition-all duration-300 border-opacity-40 h-full hover:border-primary/60 hover:shadow-lg",
          className
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            isDark ? "from-primary/10 to-transparent" : "from-primary/5 to-transparent"
          )} 
        />
        
        <CardContent className="p-2 sm:p-3 flex flex-col h-full">
          <div className="flex justify-between items-start mb-1 sm:mb-1">
            <div className={cn(
              "p-1.5 sm:p-2 rounded-full w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center transition-colors duration-300",
              isDark ? "bg-primary/20 group-hover:bg-primary/30" : "bg-primary/10 group-hover:bg-primary/20"
            )}>
              <Icon className="h-4 w-4 sm:h-4 sm:w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-base sm:text-lg font-semibold mb-1 font-display group-hover:text-primary transition-colors duration-200 line-clamp-2">{title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{description}</p>
          </div>
          
          <div className="mt-2 text-primary text-xs sm:text-sm font-medium flex items-center transition-all duration-300 group-hover:translate-x-1">
            Calculate
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 transition-all duration-300 group-hover:ml-2"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  );
};

export default CalculatorCard;
