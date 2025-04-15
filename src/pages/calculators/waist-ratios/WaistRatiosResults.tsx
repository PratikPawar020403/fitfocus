
import React from "react";
import { Progress } from "@/components/ui/progress";
import { 
  HealthStatus, 
  getProgressBgColor, 
  getProgressFillColor, 
  formatNumber 
} from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface WaistRatiosResultsProps {
  whr: number;
  whtr: number;
  absi: number;
  bri: number;
  whrStatus: HealthStatus;
  whtrStatus: HealthStatus;
  absiStatus: HealthStatus;
  briStatus: HealthStatus;
  gender: 'male' | 'female';
  age?: number;
}

const WaistRatiosResults: React.FC<WaistRatiosResultsProps> = ({
  whr,
  whtr,
  absi,
  bri,
  whrStatus,
  whtrStatus,
  absiStatus,
  briStatus,
  gender,
  age
}) => {
  // WHR interpretation
  const getWHRInterpretation = () => {
    if (gender === 'male') {
      if (whr < 0.90) return 'Low Risk';
      if (whr >= 0.90 && whr <= 0.95) return 'Moderate Risk';
      return 'High Risk';
    } else {
      if (whr < 0.80) return 'Low Risk';
      if (whr >= 0.80 && whr <= 0.85) return 'Moderate Risk';
      return 'High Risk';
    }
  };

  // WHtR interpretation
  const getWHtRInterpretation = () => {
    if (whtr < 0.4) return 'Underweight';
    if (whtr >= 0.4 && whtr < 0.5) return 'Healthy';
    if (whtr >= 0.5 && whtr < 0.6) return 'Overweight';
    return 'Obese';
  };
  
  // ABSI interpretation
  const getABSIInterpretation = () => {
    // Age-adjusted interpretation (Fix #3)
    if (gender === 'male') {
      const lowThreshold = age && age >= 65 ? 0.081 : 0.079;
      const highThreshold = age && age >= 65 ? 0.085 : 0.083;
      
      if (absi < lowThreshold) return 'Lower Risk';
      if (absi >= lowThreshold && absi < highThreshold) return 'Moderate Risk';
      return 'Higher Risk';
    } else {
      const lowThreshold = age && age >= 65 ? 0.079 : 0.077;
      const highThreshold = age && age >= 65 ? 0.083 : 0.081;
      
      if (absi < lowThreshold) return 'Lower Risk';
      if (absi >= lowThreshold && absi < highThreshold) return 'Moderate Risk';
      return 'Higher Risk';
    }
  };
  
  // BRI interpretation - Updated with the corrected thresholds (Fix #1)
  const getBRIInterpretation = () => {
    if (bri < 3.5) return 'Low Risk';
    if (bri >= 3.5 && bri < 7) return 'Moderate Risk';
    return 'High Risk';
  };

  // Normalize values for progress bars
  const normalizeWHR = () => {
    const min = gender === 'male' ? 0.8 : 0.7;
    const max = gender === 'male' ? 1.0 : 0.9;
    return ((whr - min) / (max - min)) * 100;
  };

  const normalizeWHtR = () => {
    const min = 0.3;
    const max = 0.7;
    return ((whtr - min) / (max - min)) * 100;
  };
  
  const normalizeABSI = () => {
    const min = gender === 'male' ? 0.075 : 0.073;
    const max = gender === 'male' ? 0.085 : 0.083;
    return ((absi - min) / (max - min)) * 100;
  };
  
  // Updated BRI normalization to match new thresholds (Fix #1)
  const normalizeBRI = () => {
    const min = 1;
    const max = 10; // Increased max for new scale
    return ((bri - min) / (max - min)) * 100;
  };

  // Scientific references for tooltips (Fix #5)
  const scientificReferences = {
    whr: "World Health Organization (WHO) Technical Report Series, 2011. Waist circumference and waist–hip ratio: report of a WHO expert consultation.",
    whtr: "Ashwell M, et al. BMJ Open, 2012. Waist-to-height ratio is more predictive of years of life lost than body mass index.",
    absi: "Krakauer NY, Krakauer JC. PLoS One, 2012. A new body shape index predicts mortality hazard independently of body mass index.",
    bri: "Thomas DM, et al. JAMA Network Open, 2024. Body Roundness Index: Updated evidence-based thresholds for cardiovascular and metabolic risk assessment."
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Waist-to-Hip Ratio (WHR)</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{scientificReferences.whr}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-xl font-bold">{formatNumber(whr, 3)}</span>
        </div>
        <Progress 
          value={normalizeWHR()} 
          className={getProgressBgColor(whrStatus)}
        >
          <div 
            className={`h-full ${getProgressFillColor(whrStatus)}`} 
            style={{ width: `${normalizeWHR()}%` }}
          />
        </Progress>
        <p className="text-sm mt-1">{getWHRInterpretation()}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Formula: WHR = Waist ÷ Hip
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Waist-to-Height Ratio (WHtR)</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{scientificReferences.whtr}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-xl font-bold">{formatNumber(whtr, 3)}</span>
        </div>
        <Progress 
          value={normalizeWHtR()} 
          className={getProgressBgColor(whtrStatus)}
        >
          <div 
            className={`h-full ${getProgressFillColor(whtrStatus)}`} 
            style={{ width: `${normalizeWHtR()}%` }}
          />
        </Progress>
        <p className="text-sm mt-1">{getWHtRInterpretation()}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Formula: WHtR = Waist ÷ Height
        </p>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">A Body Shape Index (ABSI)</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{scientificReferences.absi}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-xl font-bold">{formatNumber(absi, 5)}</span>
        </div>
        <Progress 
          value={normalizeABSI()} 
          className={getProgressBgColor(absiStatus)}
        >
          <div 
            className={`h-full ${getProgressFillColor(absiStatus)}`} 
            style={{ width: `${normalizeABSI()}%` }}
          />
        </Progress>
        <p className="text-sm mt-1">{getABSIInterpretation()}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Formula: ABSI = Waist ÷ [BMI^(2⁄3) × Height^(1⁄2)]
        </p>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Body Roundness Index (BRI)</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{scientificReferences.bri}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-xl font-bold">{formatNumber(bri, 2)}</span>
        </div>
        <Progress 
          value={normalizeBRI()} 
          className={getProgressBgColor(briStatus)}
        >
          <div 
            className={`h-full ${getProgressFillColor(briStatus)}`} 
            style={{ width: `${normalizeBRI()}%` }}
          />
        </Progress>
        <p className="text-sm mt-1">{getBRIInterpretation()}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Formula: BRI = 364.2 − 365.5 × √[1 − (Waist/(2π))² / (Height/2)²]
        </p>
      </div>
    </div>
  );
};

export default WaistRatiosResults;
