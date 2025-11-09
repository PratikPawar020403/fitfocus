
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplet } from "lucide-react";

interface WaterIntakeResultsProps {
  waterIntake: number;
  weight: number;
}

const WaterIntakeResults: React.FC<WaterIntakeResultsProps> = ({ waterIntake, weight }) => {
  // Convert to cups (1 liter ≈ 4.22675 cups)
  const cups = Math.round(waterIntake * 4.22675);
  
  // Convert to oz (1 liter ≈ 33.814 oz)
  const ounces = Math.round(waterIntake * 33.814);
  
  // Visual representation - 8 water drops with filled ones representing hydration
  const totalDrops = 8;
  const filledDrops = Math.round((waterIntake / 3) * totalDrops); // Based on max ~3L
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Your Daily Water Intake</h3>
        
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-500">{waterIntake.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Liters per day</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-2xl font-bold">{cups}</p>
            <p className="text-xs text-muted-foreground">Cups</p>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-2xl font-bold">{ounces}</p>
            <p className="text-xs text-muted-foreground">Ounces</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Minimum</span>
            <span>Your Target</span>
            <span>Maximum</span>
          </div>
          <Progress value={(waterIntake / 4) * 100} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1.5L</span>
            <span>{waterIntake.toFixed(1)}L</span>
            <span>4.0L</span>
          </div>
        </div>
        
        <div className="flex justify-center space-x-1 mt-6">
          {Array.from({ length: totalDrops }).map((_, i) => (
            <Droplet
              key={i}
              className={`h-6 w-6 ${
                i < filledDrops 
                  ? "text-blue-500 fill-blue-500" 
                  : "text-blue-200 dark:text-blue-900"
              }`}
            />
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground mt-6">
          This calculation is based on your weight of {weight}kg. Remember to adjust your intake 
          based on activity level, climate, and individual health needs.
        </p>
      </CardContent>
    </Card>
  );
};

export default WaterIntakeResults;
