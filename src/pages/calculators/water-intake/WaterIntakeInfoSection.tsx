
import React from "react";
import { Card } from "@/components/ui/card";

const WaterIntakeInfoSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-secondary/30 rounded-xl">
        <h3 className="font-medium mb-2">About Water Intake Calculation</h3>
        <p className="text-sm text-muted-foreground">
          Daily water intake is essential for maintaining bodily functions, regulating temperature, and supporting overall health. 
          This calculator provides an estimate based on your weight, but individual needs may vary depending on climate, activity level, and health status.
        </p>
      </div>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Water Intake Formula</h3>
        <div className="text-sm space-y-2">
          <p className="font-medium">Common Formulation:</p>
          <p>Approximately half your body weight (in pounds) in ounces of water per day</p>
          <p className="italic">Example: 150 lbs → ~75 ounces/day (≈ 2.2 liters)</p>
          
          <div className="mt-4 text-muted-foreground">
            <p className="font-medium">Conversion Used:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Convert weight from kg to lbs: Weight (lbs) = Weight (kg) × 2.20462</li>
              <li>Calculate ounces: Ounces = Weight (lbs) ÷ 2</li>
              <li>Convert ounces to liters: Liters = Ounces × 0.0295735</li>
            </ol>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Hydration Guidelines</h3>
        <div className="text-sm space-y-3">
          <div>
            <p className="font-medium">General Recommendations:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Men: approximately 3.7 liters (125 oz) per day</li>
              <li>Women: approximately 2.7 liters (91 oz) per day</li>
              <li>This includes water from all beverages and foods</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">Signs of Proper Hydration:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Light-colored or clear urine</li>
              <li>Urinating 4-6 times per day</li>
              <li>Feeling energetic and alert</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">Factors That Increase Water Needs:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Hot climate or environment</li>
              <li>Physical activity and exercise</li>
              <li>Illness with fever, vomiting, or diarrhea</li>
              <li>Pregnancy or breastfeeding</li>
            </ul>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-2">Limitations</h3>
        <p className="text-sm text-muted-foreground">
          Individual water needs can vary significantly. This calculation provides a general guideline, but personal 
          requirements depend on many factors including climate, activity level, diet, and overall health. Consult 
          with a healthcare provider for personalized recommendations.
        </p>
      </Card>
    </div>
  );
};

export default WaterIntakeInfoSection;
