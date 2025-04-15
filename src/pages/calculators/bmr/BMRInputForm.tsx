
import React, { useState } from "react";
import MetricField from "@/components/ui-custom/MetricField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// BMR calculator formulas
export type BMRFormula = "mifflin-st-jeor" | "revised-harris-benedict" | "original-harris-benedict";

interface BMRInputFormProps {
  weight: number;
  setWeight: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  age: number;
  setAge: (value: number) => void;
  gender: "male" | "female";
  setGender: (value: "male" | "female") => void;
  formula: BMRFormula;
  setFormula: (value: BMRFormula) => void;
  onCalculate: () => void;
}

const BMRInputForm: React.FC<BMRInputFormProps> = ({
  weight,
  setWeight,
  height,
  setHeight,
  age,
  setAge,
  gender,
  setGender,
  formula,
  setFormula,
  onCalculate,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Your Information</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Gender</Label>
          <RadioGroup 
            value={gender} 
            onValueChange={(value) => setGender(value as "male" | "female")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      
        <MetricField
          label="Weight"
          value={weight}
          onChange={setWeight}
          min={30}
          max={250}
          step={0.5}
          unit="kg"
        />
        
        <MetricField
          label="Height"
          value={height}
          onChange={setHeight}
          min={100}
          max={250}
          unit="cm"
        />
        
        <MetricField
          label="Age"
          value={age}
          onChange={setAge}
          min={10}
          max={100}
          unit="years"
        />
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Formula</Label>
          <Select 
            value={formula} 
            onValueChange={(value) => setFormula(value as BMRFormula)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select formula" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mifflin-st-jeor">Mifflin-St Jeor (Recommended)</SelectItem>
              <SelectItem value="revised-harris-benedict">Revised Harris-Benedict</SelectItem>
              <SelectItem value="original-harris-benedict">Original Harris-Benedict</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        className="w-full mt-4" 
        onClick={onCalculate}
      >
        Calculate BMR
      </Button>
    </div>
  );
};

export default BMRInputForm;
