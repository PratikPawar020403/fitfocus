import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Footprints } from "@/components/ui-custom/lucideIconImports";

interface DailyStepsResultsProps {
  steps: number;
  status: string;
  description: string;
  age: number;
}

const DailyStepsResults: React.FC<DailyStepsResultsProps> = ({ 
  steps, 
  status, 
  description,
  age 
}) => {
  // Calculate calories burned (rough estimate: 0.04 calories per step)
  const caloriesBurned = Math.round(steps * 0.04);
  
  // Calculate approximate distance (average stride length: 2.2 ft for women, 2.5 ft for men)
  // Using a middle value of 2.35 ft = 0.7163 meters
  const distanceKm = Math.round((steps * 0.7163 / 1000) * 10) / 10;
  const distanceMiles = Math.round((distanceKm * 0.62137) * 10) / 10;
  
  // Determine progress based on age
  const targetSteps = age >= 60 ? 8000 : 10000;
  const progress = Math.min(100, (steps / targetSteps) * 100);
  
  // Get status color
  const getStatusColor = () => {
    if (status === 'optimal') return 'text-green-600';
    if (status === 'warning') return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const statusColor = getStatusColor();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Your Daily Steps Assessment</h3>
        
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold">{steps.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">steps per day</p>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className={`text-lg font-medium ${statusColor}`}>{description}</p>
          <p className="text-sm text-muted-foreground">
            Activity level for age {age}
          </p>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span>Sedentary</span>
            <span>Moderate</span>
            <span>Active</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{targetSteps / 2}</span>
            <span>{targetSteps}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-2xl font-bold">{caloriesBurned}</p>
            <p className="text-xs text-muted-foreground">Est. calories burned</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-2xl font-bold">{distanceKm}</p>
            <p className="text-xs text-muted-foreground">Kilometers (~{distanceMiles} miles)</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {age >= 60 
            ? "For adults 60 and older, 6,000-8,000 steps per day is associated with optimal health benefits."
            : "For adults under 60, 8,000-10,000 steps per day is associated with optimal health benefits."}
        </p>
      </CardContent>
    </Card>
  );
};

export default DailyStepsResults;
