
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, HealthStatus } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { HeartPulse, Heart, Clock } from "lucide-react";
import { getRHRDescription } from "@/utils/calculators/fitness";

interface HeartRateResultsProps {
  restingHR: number;
  mhr: number;
  targetHR: {
    lower: number;
    upper: number;
  };
  rhrStatus: HealthStatus;
  intensityLevel: 'moderate' | 'vigorous';
}

const HeartRateResults: React.FC<HeartRateResultsProps> = ({
  restingHR,
  mhr,
  targetHR,
  rhrStatus,
  intensityLevel
}) => {
  const getStatusColorClass = (status: HealthStatus) => {
    switch (status) {
      case 'optimal': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'risk': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Resting Heart Rate */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center">
                  <HeartPulse className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-medium">Resting Heart Rate (RHR)</h3>
                </div>
                <p className={`text-2xl font-bold mt-2 ${getStatusColorClass(rhrStatus)}`}>
                  {formatNumber(restingHR, 0)} <span className="text-sm font-normal text-muted-foreground">bpm</span>
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                rhrStatus === 'optimal' ? 'bg-green-100 text-green-800' :
                rhrStatus === 'warning' ? 'bg-amber-100 text-amber-800' :
                rhrStatus === 'risk' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {getRHRDescription(restingHR)}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">
              Your resting heart rate is the number of times your heart beats per minute when you're at rest.
              A lower RHR generally indicates better cardiovascular fitness.
            </p>
            
            <div className="mt-4 bg-muted p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Reference Ranges:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Below 60 bpm: Athletic</li>
                <li>• 60-70 bpm: Good</li>
                <li>• 70-80 bpm: Average</li>
                <li>• 80-100 bpm: Above Average</li>
                <li>• Above 100 bpm: High (Tachycardia)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* Maximum Heart Rate */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center mb-2">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Maximum Heart Rate (MHR)</h3>
            </div>
            <p className="text-2xl font-bold mt-2">
              {formatNumber(mhr, 0)} <span className="text-sm font-normal text-muted-foreground">bpm</span>
            </p>
            
            <p className="text-sm text-muted-foreground mt-2">
              Your maximum heart rate is the upper limit of what your cardiovascular system can handle during physical activity.
              This is calculated using the formula: 220 - Age.
            </p>
          </CardContent>
        </Card>
        
        {/* Target Heart Rate */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Target Heart Rate (THR) Zone</h3>
            </div>
            <p className="text-2xl font-bold mt-2">
              {formatNumber(targetHR.lower, 0)} - {formatNumber(targetHR.upper, 0)} <span className="text-sm font-normal text-muted-foreground">bpm</span>
            </p>
            
            <div className="mt-2 flex items-center">
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {intensityLevel === 'moderate' ? 'Moderate Intensity (50-70%)' : 'Vigorous Intensity (70-85%)'}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mt-3">
              Your target heart rate zone represents the optimal range to aim for during exercise to get 
              the most cardiovascular benefit while maintaining safety.
            </p>
            
            <Separator className="my-4" />
            
            <div className="text-sm">
              <h4 className="font-medium mb-1">Benefits of Exercising in Your Target Zone:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Improved cardiovascular endurance</li>
                <li>• More efficient calorie and fat burning</li>
                <li>• Enhanced heart health and function</li>
                <li>• Reduced risk of overtraining or injury</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeartRateResults;
