
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Moon, Sun } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface SleepEfficiencyResultsProps {
  efficiency: number;
  status: string;
  description: string;
  timeInBed: number; // in minutes
  timeSleeping: number; // in minutes
}

const SleepEfficiencyResults: React.FC<SleepEfficiencyResultsProps> = ({ 
  efficiency, 
  status, 
  description,
  timeInBed,
  timeSleeping
}) => {
  // Calculate time awake in bed
  const timeAwake = timeInBed - timeSleeping;
  
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
        <h3 className="text-xl font-semibold mb-4">Your Sleep Efficiency</h3>
        
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold">{efficiency.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">sleep efficiency</p>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className={`text-lg font-medium ${statusColor}`}>{description}</p>
          <p className="text-sm text-muted-foreground">
            {efficiency >= 85 
              ? "Your sleep is efficient" 
              : efficiency >= 75 
                ? "Your sleep could be improved" 
                : "Your sleep needs attention"}
          </p>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
          </div>
          <Progress value={efficiency} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm">Time Asleep</span>
            </div>
            <p className="font-bold">{formatTime(timeSleeping)}</p>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div className="flex items-center">
              <Sun className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm">Time Awake in Bed</span>
            </div>
            <p className="font-bold">{formatTime(timeAwake)}</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Sleep efficiency of 85% or higher is generally considered good. If your efficiency is lower, 
          consider reviewing your sleep habits and environment for potential improvements.
        </p>
      </CardContent>
    </Card>
  );
};

export default SleepEfficiencyResults;
