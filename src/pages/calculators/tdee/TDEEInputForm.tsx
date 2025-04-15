
import React from "react";
import MetricField from "@/components/ui-custom/MetricField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TDEEInputFormProps {
  weight: number;
  setWeight: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  age: number;
  setAge: (value: number) => void;
  gender: "male" | "female";
  setGender: (value: "male" | "female") => void;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active" | "extra-active";
  setActivityLevel: (value: "sedentary" | "light" | "moderate" | "active" | "very-active" | "extra-active") => void;
  onCalculate: () => void;
}

const TDEEInputForm: React.FC<TDEEInputFormProps> = ({
  weight,
  setWeight,
  height,
  setHeight,
  age,
  setAge,
  gender,
  setGender,
  activityLevel,
  setActivityLevel,
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
          <Label className="text-sm font-medium">Activity Level</Label>
          <Select 
            value={activityLevel} 
            onValueChange={(value) => setActivityLevel(value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
              <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
              <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
              <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
              <SelectItem value="very-active">Very Active (intense exercise daily)</SelectItem>
              <SelectItem value="extra-active">Extra Active (athletic or physical job)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        className="w-full mt-4" 
        onClick={onCalculate}
      >
        Calculate TDEE
      </Button>
    </div>
  );
};

export default TDEEInputForm;
