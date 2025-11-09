
import React, { useState, useEffect } from "react";
import {
  Slider as SliderPrimitive,
} from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, clampValue } from "@/lib/utils";

interface MetricFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
  decimals?: number;
  showSlider?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  tooltip?: string;
}

const MetricField: React.FC<MetricFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  className = "",
  decimals = 0,
  showSlider = true,
  icon: Icon,
  tooltip,
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toFixed(decimals));

  useEffect(() => {
    setInputValue(value.toFixed(decimals));
  }, [value, decimals]);

  const handleSliderChange = (newValue: number[]) => {
    const validValue = clampValue(newValue[0], min, max);
    onChange(validValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Only update parent state when the input is a valid number
    if (newValue && !isNaN(parseFloat(newValue))) {
      const numericValue = parseFloat(newValue);
      const validValue = clampValue(numericValue, min, max);
      
      // Don't update the slider immediately for better UX, 
      // only when input is blurred or Enter is pressed
      if (numericValue === validValue) {
        onChange(validValue);
      }
    }
  };

  const handleInputBlur = () => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      // Reset to previous valid value
      setInputValue(value.toFixed(decimals));
      return;
    }
    
    const numericValue = parseFloat(inputValue);
    const validValue = clampValue(numericValue, min, max);
    setInputValue(validValue.toFixed(decimals));
    onChange(validValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  // Slider props to match our styling
  const sliderProps = {
    defaultValue: [value],
    value: [value],
    min,
    max,
    step,
    onValueChange: handleSliderChange,
    className: "my-4",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-20 h-8 text-center text-sm"
          />
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
      
      {showSlider && (
        <SliderPrimitive {...sliderProps} />
      )}
    </div>
  );
};

export default MetricField;
