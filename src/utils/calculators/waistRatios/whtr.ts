
import { HealthStatus } from "@/lib/utils";
import { WHtRInput, CalculationResult } from "../../types/calculator.types";

// Waist-to-Height Ratio
export const calculateWHtR = (input: WHtRInput): number => {
  const { waist, height } = input;
  
  // Validation
  if (waist <= 0 || height <= 0) {
    throw new Error("Waist and height must be positive values");
  }
  
  return waist / height;
};

export const getWHtRStatus = (whtr: number): HealthStatus => {
  if (isNaN(whtr) || whtr <= 0) {
    return "neutral";
  }
  
  if (whtr < 0.4) return 'warning'; // Underweight
  if (whtr >= 0.4 && whtr < 0.5) return 'optimal'; // Healthy
  if (whtr >= 0.5 && whtr < 0.6) return 'warning'; // Overweight
  return 'risk'; // Obese
};

export const getWHtRDescription = (whtr: number): string => {
  if (whtr < 0.4) return 'Underweight';
  if (whtr >= 0.4 && whtr < 0.5) return 'Healthy';
  if (whtr >= 0.5 && whtr < 0.6) return 'Overweight';
  return 'Obese';
};

export const calculateWHtRWithStatus = (input: WHtRInput): CalculationResult<number> => {
  const whtrValue = calculateWHtR(input);
  return {
    value: whtrValue,
    status: getWHtRStatus(whtrValue),
    description: getWHtRDescription(whtrValue)
  };
};
