
import React from "react";
import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";

interface TDEEResultsProps {
  bmr: number;
  tdee: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active" | "extra-active";
}

const TDEEResults: React.FC<TDEEResultsProps> = ({ bmr, tdee, activityLevel }) => {
  // Map activity levels to descriptions
  const activityDescriptions = {
    "sedentary": "Little or no exercise, desk job",
    "light": "Light exercise 1-3 days per week",
    "moderate": "Moderate exercise 3-5 days per week",
    "active": "Hard exercise 6-7 days per week",
    "very-active": "Very hard exercise, physical job or 2x training",
    "extra-active": "Professional athlete level"
  };

  // Map activity levels to multipliers for display
  const activityMultipliers = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very-active": 1.9,
    "extra-active": 2.3
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Your Results</h2>
      
      <div className="text-center p-6 bg-secondary/50 rounded-xl">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Your Total Daily Energy Expenditure
        </h3>
        <div className="flex items-center justify-center mb-2">
          <span className="text-4xl font-bold">
            {tdee > 0 ? Math.round(tdee) : "0"}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">
            calories/day
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          This is the estimated number of calories you burn each day.
        </p>
      </div>
      
      {/* BMR Information Card */}
      {bmr > 0 && (
        <Card className="p-4">
          <div className="flex items-start">
            <div className="p-1.5 rounded-full mr-3 mt-0.5 bg-primary/10">
              <Circle className="h-3 w-3 text-primary" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-medium">Basal Metabolic Rate (BMR)</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your BMR is <span className="font-medium">{Math.round(bmr)} calories</span>, which represents the minimum energy your body needs to function at rest.
              </p>
            </div>
          </div>
        </Card>
      )}
      
      {/* Activity Multiplier Information */}
      {tdee > 0 && (
        <Card className="p-4">
          <div className="flex items-start">
            <div className="p-1.5 rounded-full mr-3 mt-0.5 bg-primary/10">
              <Circle className="h-3 w-3 text-primary" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-medium">Activity Level: {activityLevel.replace('-', ' ')} ({activityMultipliers[activityLevel]}x)</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {activityDescriptions[activityLevel]}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                TDEE = BMR × Activity Multiplier<br/>
                TDEE = {Math.round(bmr)} × {activityMultipliers[activityLevel]} = {Math.round(tdee)} calories
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TDEEResults;
