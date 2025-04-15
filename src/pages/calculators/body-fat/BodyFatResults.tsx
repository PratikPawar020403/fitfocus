
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Circle } from "lucide-react";
import { cn, HealthStatus } from "@/lib/utils";
import { getBodyFatStatus, getRFMStatus } from "@/utils/calculators";

interface BodyFatResultsProps {
  bodyFat: number | null;
  rfm: number | null;
  gender: 'male' | 'female';
}

const BodyFatResults = ({ bodyFat, rfm, gender }: BodyFatResultsProps) => {
  const getBodyFatInterpretation = () => {
    if (bodyFat === null) return "";
    
    if (gender === 'male') {
      if (bodyFat < 6) return "Essential fat level - extremely low body fat, which can pose health risks.";
      if (bodyFat >= 6 && bodyFat < 14) return "Athletic level - typical for athletes, excellent fitness.";
      if (bodyFat >= 14 && bodyFat < 18) return "Fitness level - indicates good fitness, very healthy range.";
      if (bodyFat >= 18 && bodyFat < 25) return "Average level - typical for many men, acceptable range.";
      return "Above average - higher than recommended, may increase health risks.";
    } else {
      if (bodyFat < 16) return "Essential fat level - extremely low body fat, which can pose health risks.";
      if (bodyFat >= 16 && bodyFat < 23) return "Athletic level - typical for female athletes, excellent fitness.";
      if (bodyFat >= 23 && bodyFat < 30) return "Fitness level - indicates good fitness, very healthy range.";
      if (bodyFat >= 30 && bodyFat < 35) return "Average level - typical for many women, acceptable range.";
      return "Above average - higher than recommended, may increase health risks.";
    }
  };

  const getRFMInterpretation = () => {
    if (rfm === null) return "";
    
    if (gender === 'male') {
      if (rfm < 6) return "Very low fat - potentially unhealthy low level.";
      if (rfm >= 6 && rfm < 18) return "Healthy range - optimal fat levels for most men.";
      if (rfm >= 18 && rfm < 25) return "Moderately high - above optimal, consider lifestyle changes.";
      return "High fat - significantly above recommended levels, increased health risks.";
    } else {
      if (rfm < 14) return "Very low fat - potentially unhealthy low level.";
      if (rfm >= 14 && rfm < 30) return "Healthy range - optimal fat levels for most women.";
      if (rfm >= 30 && rfm < 35) return "Moderately high - above optimal, consider lifestyle changes.";
      return "High fat - significantly above recommended levels, increased health risks.";
    }
  };

  const bodyFatStatus = bodyFat ? getBodyFatStatus(bodyFat, gender) : "neutral";
  const rfmStatus = rfm ? getRFMStatus(rfm, gender) : "neutral";

  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
      case "optimal": return "text-health-optimal";
      case "warning": return "text-health-warning";
      case "risk": return "text-health-risk";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Your Results</h2>
      
      {/* Navy Method Results */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Body Fat Percentage (Navy Method)</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2">
            {bodyFat !== null ? `${bodyFat.toFixed(1)}%` : "--"}
          </div>
          <p className={cn("text-sm font-medium", getStatusColor(bodyFatStatus))}>
            {bodyFat !== null ? getBodyFatInterpretation() : "Calculate to see your body fat category"}
          </p>
        </div>
        
        {bodyFat !== null && (
          <div className="mt-4">
            <Progress value={Math.min(100, bodyFat)} className="mb-2" />
            <div className="grid grid-cols-5 text-xs text-muted-foreground gap-1 text-center">
              <div>Essential</div>
              <div>Athletic</div>
              <div>Fitness</div>
              <div>Average</div>
              <div>Above</div>
            </div>
          </div>
        )}
      </Card>
      
      {/* RFM Results */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Relative Fat Mass (RFM)</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2">
            {rfm !== null ? `${rfm.toFixed(1)}%` : "--"}
          </div>
          <p className={cn("text-sm font-medium", getStatusColor(rfmStatus))}>
            {rfm !== null ? getRFMInterpretation() : "Calculate to see your RFM category"}
          </p>
        </div>
        
        {rfm !== null && (
          <div className="mt-4">
            <Progress value={Math.min(100, rfm)} className="mb-2" />
            <div className="grid grid-cols-4 text-xs text-muted-foreground gap-1 text-center">
              <div>Low</div>
              <div>Healthy</div>
              <div>Moderate</div>
              <div>High</div>
            </div>
          </div>
        )}
      </Card>
      
      {/* Interpretation Card */}
      {(bodyFat !== null || rfm !== null) && (
        <Card className={cn("border-l-4", {
          "border-l-health-optimal": bodyFatStatus === "optimal",
          "border-l-health-warning": bodyFatStatus === "warning",
          "border-l-health-risk": bodyFatStatus === "risk"
        })}>
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className={cn("p-1.5 rounded-full mr-3 mt-0.5", `bg-${bodyFatStatus}/10`)}>
                <Circle className={cn("h-3 w-3", getStatusColor(bodyFatStatus))} fill="currentColor" />
              </div>
              <div>
                <h3 className={cn("font-medium", getStatusColor(bodyFatStatus))}>
                  {bodyFatStatus === "optimal" ? "Healthy Body Fat Range" : 
                   bodyFatStatus === "warning" ? "Attention Needed" : "Health Risk"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {bodyFatStatus === "optimal" 
                    ? "Your body fat percentage is in a healthy range. Maintain your current lifestyle habits."
                    : bodyFatStatus === "warning" && bodyFat! < (gender === 'male' ? 6 : 16)
                      ? "Your body fat percentage is below the essential fat level. This may affect your health and hormone function."
                      : bodyFatStatus === "warning"
                        ? "Your body fat percentage is above the recommended range. Consider lifestyle adjustments."
                        : "Your body fat percentage indicates increased health risks. Consider consulting with a healthcare professional."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BodyFatResults;
