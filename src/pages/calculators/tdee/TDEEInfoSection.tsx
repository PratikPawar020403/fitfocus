
import React from "react";
import { Card } from "@/components/ui/card";

const TDEEInfoSection: React.FC = () => {
  return (
    <div className="mt-10 space-y-6">
      <div className="p-6 bg-secondary/30 rounded-xl">
        <h3 className="font-medium mb-2">About TDEE</h3>
        <p className="text-sm text-muted-foreground">
          Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day. It includes your Basal Metabolic Rate (BMR) plus additional calories burned through physical activity and the thermic effect of food (energy used to digest food).
        </p>
      </div>
      
      <Card className="p-4">
        <h3 className="font-medium mb-2">Using TDEE for Weight Management</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>To maintain weight:</strong> Consume calories equal to your TDEE</p>
          <p><strong>To lose weight:</strong> Consume fewer calories than your TDEE (typically 250-500 calories less per day for 0.5-1 lb weight loss per week)</p>
          <p><strong>To gain weight:</strong> Consume more calories than your TDEE (typically 250-500 calories more per day for 0.5-1 lb weight gain per week)</p>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-medium mb-2">Activity Level Definitions</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Sedentary (1.2):</strong> Little or no exercise, desk job</p>
          <p><strong>Light (1.375):</strong> Light exercise 1-3 days per week</p>
          <p><strong>Moderate (1.55):</strong> Moderate exercise 3-5 days per week</p>
          <p><strong>Active (1.725):</strong> Hard exercise 6-7 days per week</p>
          <p><strong>Very Active (1.9):</strong> Very hard exercise, physical job or 2x training</p>
          <p><strong>Extra Active (2.3):</strong> Professional athlete level</p>
        </div>
      </Card>
    </div>
  );
};

export default TDEEInfoSection;
