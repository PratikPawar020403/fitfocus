
import React, { useState } from "react";
import MetricField from "@/components/ui-custom/MetricField";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { storage } from "@/utils/storage";
import { calculateBodyFat, calculateRFM } from "@/utils/calculators";
import { toast } from "sonner";

interface BodyFatFormProps {
  onCalculate: (bodyFat: number, rfm: number) => void;
}

const BodyFatForm = ({ onCalculate }: BodyFatFormProps) => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [waist, setWaist] = useState(0);
  const [neck, setNeck] = useState(0);
  const [hip, setHip] = useState(0);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleGenderChange = (value: string) => {
    if (value === 'male' || value === 'female') {
      setGender(value);
    }
  };

  const calculateResults = () => {
    try {
      // Validate required inputs
      if (height <= 0 || neck <= 0 || waist <= 0) {
        toast.error("Please enter valid measurements (greater than 0)");
        return;
      }
      
      if (gender === 'female' && hip <= 0) {
        toast.error("Hip measurement is required for females");
        return;
      }
      
      // Calculate body fat percentage and RFM
      const calculatedBodyFat = calculateBodyFat({
        waist, neck, height, gender, hip
      });
      const calculatedRFM = calculateRFM({
        height, waist, gender
      });
      
      // Save profile values
      storage.saveProfile({
        weight,
        height,
        waist,
        neck,
        hip,
        gender,
      });
      
      onCalculate(calculatedBodyFat, calculatedRFM);
      
      toast.success("Body fat calculated and saved!", {
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error calculating body fat:", error);
      toast.error("Error calculating body fat. Please check your inputs.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium mb-4">Your Measurements</h2>
      
      <div className="mb-6">
        <RadioGroup 
          value={gender} 
          onValueChange={handleGenderChange}
          className="flex space-x-6"
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
        label="Height"
        value={height}
        onChange={setHeight}
        min={100}
        max={250}
        unit="cm"
      />
      
      <MetricField
        label="Weight (optional)"
        value={weight}
        onChange={setWeight}
        min={30}
        max={250}
        step={0.5}
        unit="kg"
      />
      
      <MetricField
        label="Neck Circumference"
        value={neck}
        onChange={setNeck}
        min={20}
        max={60}
        step={0.5}
        unit="cm"
      />
      
      <MetricField
        label="Waist Circumference"
        value={waist}
        onChange={setWaist}
        min={40}
        max={200}
        step={0.5}
        unit="cm"
      />
      
      {gender === 'female' && (
        <MetricField
          label="Hip Circumference"
          value={hip}
          onChange={setHip}
          min={50}
          max={200}
          step={0.5}
          unit="cm"
        />
      )}
      
      <Button 
        className="w-full mt-4" 
        onClick={calculateResults}
      >
        Calculate Body Fat
      </Button>
      
      <div className="mt-4 p-4 bg-secondary/30 rounded-xl">
        <h3 className="font-medium mb-2">Measurement Tips</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Neck: Measure around the middle of your neck, below the larynx (Adam's apple).</li>
          <li>Waist: Measure around your natural waistline at the narrowest part, typically just above the belly button.</li>
          {gender === 'female' && (
            <li>Hip: Measure around the widest part of your hips/buttocks.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BodyFatForm;
