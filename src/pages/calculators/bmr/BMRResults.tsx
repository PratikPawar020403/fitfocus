
import React from "react";
import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";
import { BMRFormula } from "./BMRInputForm";

interface BMRResultsProps {
  bmr: number;
  formula: BMRFormula;
}

const BMRResults: React.FC<BMRResultsProps> = ({ bmr, formula }) => {
  const renderFormulaExplanation = () => {
    if (formula === "mifflin-st-jeor") {
      return (
        <>
          <span className="font-medium">Mifflin-St Jeor Equation:</span><br />
          For men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5<br />
          For women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
        </>
      );
    } else if (formula === "revised-harris-benedict") {
      return (
        <>
          <span className="font-medium">Revised Harris-Benedict Equation:</span><br />
          For men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)<br />
          For women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)
        </>
      );
    } else {
      return (
        <>
          <span className="font-medium">Original Harris-Benedict Equation:</span><br />
          For men: BMR = 66.5 + (13.75 × weight in kg) + (5.003 × height in cm) - (6.75 × age in years)<br />
          For women: BMR = 655.1 + (9.563 × weight in kg) + (1.850 × height in cm) - (4.676 × age in years)
        </>
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Your Results</h2>
      
      <div className="text-center p-6 bg-secondary/50 rounded-xl">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Your Basal Metabolic Rate
        </h3>
        <div className="flex items-center justify-center mb-2">
          <span className="text-4xl font-bold">
            {bmr > 0 ? Math.round(bmr) : "0"}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">
            calories/day
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          This is the number of calories your body needs at complete rest.
        </p>
      </div>
      
      {/* BMR Formula Explanation */}
      {bmr > 0 && (
        <Card className="p-4">
          <div className="flex items-start">
            <div className="p-1.5 rounded-full mr-3 mt-0.5 bg-primary/10">
              <Circle className="h-3 w-3 text-primary" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-medium">About Your BMR</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your BMR of <span className="font-medium">{Math.round(bmr)} calories</span> represents the minimum energy your body needs to function while at rest. This includes breathing, circulating blood, regulating body temperature, and growing and repairing cells.
              </p>
            </div>
          </div>
        </Card>
      )}
      
      {/* Formula Information */}
      <Card className="p-4">
        <h3 className="font-medium mb-2">Formula Used</h3>
        <p className="text-sm text-muted-foreground">
          {renderFormulaExplanation()}
        </p>
      </Card>
    </div>
  );
};

export default BMRResults;
