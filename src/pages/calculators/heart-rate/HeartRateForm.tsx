
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MetricField from "@/components/ui-custom/MetricField";
import { formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface HeartRateFormProps {
  age: number;
  setAge: (value: number) => void;
  restingHR: number;
  setRestingHR: (value: number) => void;
  intensityLevel: 'moderate' | 'vigorous';
  setIntensityLevel: (value: 'moderate' | 'vigorous') => void;
}

const HeartRateForm: React.FC<HeartRateFormProps> = ({
  age,
  setAge,
  restingHR,
  setRestingHR,
  intensityLevel,
  setIntensityLevel
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <MetricField
          label="Age"
          value={age}
          onChange={setAge}
          min={10}
          max={100}
          unit="years"
        />

        <MetricField
          label="Resting Heart Rate"
          value={restingHR}
          onChange={setRestingHR}
          min={30}
          max={130}
          unit="bpm"
        />

        <div>
          <Label className="text-base">Exercise Intensity</Label>
          <RadioGroup
            value={intensityLevel}
            onValueChange={(value) => setIntensityLevel(value as 'moderate' | 'vigorous')}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate">Moderate (50-70% of MHR)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vigorous" id="vigorous" />
              <Label htmlFor="vigorous">Vigorous (70-85% of MHR)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Quick Results</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Maximum Heart Rate</p>
            <p className="text-lg font-semibold">{formatNumber(220 - age, 0)} bpm</p>
          </Card>
          
          <Card className="p-3">
            <p className="text-xs text-muted-foreground">Resting Heart Rate</p>
            <p className="text-lg font-semibold">{formatNumber(restingHR, 0)} bpm</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeartRateForm;
