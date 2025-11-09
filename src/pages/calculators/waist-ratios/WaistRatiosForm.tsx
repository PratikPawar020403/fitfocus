
import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MetricField from "@/components/ui-custom/MetricField";
import { formatNumber } from "@/lib/utils";

interface WaistRatiosFormProps {
  waist: number;
  setWaist: (value: number) => void;
  hip: number;
  setHip: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
  age: number;
  setAge: (value: number) => void;
  whr: number;
  whtr: number;
}

const WaistRatiosForm: React.FC<WaistRatiosFormProps> = ({
  waist,
  setWaist,
  hip,
  setHip,
  height,
  setHeight,
  weight,
  setWeight,
  gender,
  setGender,
  age,
  setAge,
  whr,
  whtr
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base">Gender</Label>
          <RadioGroup
            value={gender}
            onValueChange={(value) => setGender(value as 'male' | 'female')}
            className="flex flex-col space-y-1 mt-2"
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
          label="Waist Circumference"
          value={waist}
          onChange={setWaist}
          min={40}
          max={200}
          unit="cm"
        />

        <MetricField
          label="Hip Circumference"
          value={hip}
          onChange={setHip}
          min={40}
          max={200}
          unit="cm"
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
          label="Weight"
          value={weight}
          onChange={setWeight}
          min={30}
          max={300}
          unit="kg"
        />
        
        <MetricField
          label="Age"
          value={age}
          onChange={setAge}
          min={18}
          max={120}
          unit="years"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Quick Results</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Waist-to-Hip Ratio</p>
            <p className="text-lg font-semibold">{formatNumber(whr, 2)}</p>
          </Card>
          
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Waist-to-Height Ratio</p>
            <p className="text-lg font-semibold">{formatNumber(whtr, 2)}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WaistRatiosForm;
