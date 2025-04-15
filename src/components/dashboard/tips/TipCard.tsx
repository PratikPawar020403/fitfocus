
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface TipCardProps {
  title: string;
  content: string;
  type: 'warning' | 'primary' | 'risk' | 'optimal';
  citation?: string;
  icon?: React.ReactNode;
}

const TipCard: React.FC<TipCardProps> = ({ title, content, type, citation, icon }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const getBgColor = () => {
    switch (type) {
      case 'optimal': return isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200/40';
      case 'warning': return isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200/40';
      case 'risk': return isDark ? 'bg-rose-500/10 border-rose-500/20' : 'bg-rose-50 border-rose-200/40';
      case 'primary': return isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200/40';
      default: return isDark ? 'bg-gray-500/10 border-gray-500/20' : 'bg-gray-50 border-gray-200/40';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'optimal': return isDark ? 'text-emerald-400' : 'text-emerald-600';
      case 'warning': return isDark ? 'text-amber-400' : 'text-amber-600';
      case 'risk': return isDark ? 'text-rose-400' : 'text-rose-600';
      case 'primary': return isDark ? 'text-blue-400' : 'text-blue-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'optimal': return <CheckCircle className={cn("h-4 w-4", getTextColor())} />;
      case 'warning': return <AlertTriangle className={cn("h-4 w-4", getTextColor())} />;
      case 'risk': return <AlertCircle className={cn("h-4 w-4", getTextColor())} />;
      case 'primary': return <Info className={cn("h-4 w-4", getTextColor())} />;
      default: return <Info className={cn("h-4 w-4", getTextColor())} />;
    }
  };

  return (
    <div className={cn(
      "p-3 rounded-lg border transition-all duration-300 hover:shadow-md", 
      getBgColor()
    )}>
      <div className="flex items-start gap-2">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className={cn("font-medium", getTextColor())}>{title}</h4>
            {citation && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">{citation}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default TipCard;
