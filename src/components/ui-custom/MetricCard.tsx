
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getStatusColor, getProgressBgColor, getProgressFillColor, formatNumber } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HealthStatus } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  unit?: string;
  status?: HealthStatus;
  description?: string;
  progress?: number; // 0-100
  className?: string;
  onClick?: () => void;
  tooltipText?: string;
  decimals?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  unit = "",
  status = "neutral",
  description = "",
  progress,
  className = "",
  onClick,
  tooltipText,
  decimals = 1,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Enhanced status color mapping
  const getEnhancedStatusColor = () => {
    switch (status) {
      case "optimal": return isDark ? "text-emerald-400" : "text-emerald-600";
      case "warning": return isDark ? "text-amber-400" : "text-amber-600";
      case "risk": return isDark ? "text-rose-400" : "text-rose-600";
      default: return isDark ? "text-blue-400" : "text-blue-600";
    }
  };
  
  // Enhanced background color for the icon container
  const getEnhancedBgColor = () => {
    switch (status) {
      case "optimal": return isDark ? "bg-emerald-900/30" : "bg-emerald-100";
      case "warning": return isDark ? "bg-amber-900/30" : "bg-amber-100";
      case "risk": return isDark ? "bg-rose-900/30" : "bg-rose-100";
      default: return isDark ? "bg-blue-900/30" : "bg-blue-100";
    }
  };
  
  const statusColorClass = getEnhancedStatusColor();
  const bgColorClass = getEnhancedBgColor();
  
  // Format the value if it's a number
  const displayValue = typeof value === 'number' ? formatNumber(value, decimals) : value;
  
  return (
    <Card 
      className={cn(
        "health-card overflow-hidden transition-all duration-300 cursor-pointer border-t-4",
        {
          "border-t-emerald-500": status === "optimal",
          "border-t-amber-500": status === "warning",
          "border-t-rose-500": status === "risk",
          "border-t-blue-500": status === "neutral",
        },
        "hover:shadow-lg hover:-translate-y-1 active:scale-98",
        className
      )}
      onClick={onClick}
      role="button"
      aria-label={`${title}: ${displayValue}${unit}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <CardContent className="p-4 pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-baseline mt-1">
              <p className={cn("text-2xl font-bold transition-colors", statusColorClass)}>
                {displayValue}
              </p>
              {unit && (
                <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
              )}
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("p-2 rounded-full transition-colors", bgColorClass)}>
                  <Icon className={cn("h-4 w-4", statusColorClass)} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText || title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1 mb-2">{description}</p>
        )}
        
        {progress !== undefined && (
          <div className="mt-3">
            <div className={cn("h-1.5 rounded-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800 transition-colors")}>
              <div 
                className={cn("h-full rounded-full transition-all duration-700", {
                  "bg-emerald-500": status === "optimal",
                  "bg-amber-500": status === "warning",
                  "bg-rose-500": status === "risk",
                  "bg-blue-500": status === "neutral",
                })} 
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
