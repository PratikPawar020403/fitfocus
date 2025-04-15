
import { HealthStatus } from "@/lib/utils";
import { BRIInput, CalculationResult } from "../../types/calculator.types";

// Body Roundness Index (BRI) - Corrected formula (Fix #1)
export const calculateBRI = (input: BRIInput): number => {
  const { waist, height } = input;
  
  // Validation
  if (waist <= 0 || height <= 0) {
    throw new Error("Waist and height must be positive values");
  }
  
  // Enhanced validation (Fix #6: Input Validation)
  if (waist > 250) { // 250 cm is about 8.2 feet
    throw new Error("Waist measurement exceeds realistic bounds");
  }
  
  if (height > 250) {
    throw new Error("Height measurement exceeds realistic bounds");
  }
  
  // CORRECTED FORMULA: using waist and height in cm
  const waistM = waist / (2 * Math.PI);
  const heightHalf = height / 2;
  
  // Formula: 364.2 − 365.5 × √(1 − [waist/(2π)]² / [height/2]²)
  return 364.2 - 365.5 * Math.sqrt(1 - Math.pow(waistM / heightHalf, 2));
};

// Updated BRI thresholds (Fix #1)
export const getBRIStatus = (bri: number): HealthStatus => {
  if (isNaN(bri) || bri <= 0) {
    return "neutral";
  }
  
  // Updated evidence-based thresholds
  if (bri < 3.5) return 'optimal';  // Low risk: 1-3.4
  if (bri < 7) return 'warning';    // Moderate risk: 3.5-6.9
  return 'risk';                    // High risk: ≥7
};

export const getBRIDescription = (bri: number): string => {
  // Updated descriptions to match new thresholds
  if (bri < 3.5) return 'Low Risk';
  if (bri < 7) return 'Moderate Risk';
  return 'High Risk';
};

export const calculateBRIWithStatus = (input: BRIInput): CalculationResult<number> => {
  const briValue = calculateBRI(input);
  return {
    value: briValue,
    status: getBRIStatus(briValue),
    description: getBRIDescription(briValue)
  };
};
