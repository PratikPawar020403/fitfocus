
import { HealthStatus } from "@/lib/utils";
import { WHRInput, CalculationResult } from "../../types/calculator.types";

// Waist-to-Hip Ratio
export const calculateWHR = (input: WHRInput): number => {
  const { waist, hip } = input;
  
  // Validation
  if (waist <= 0 || hip <= 0) {
    throw new Error("Waist and hip must be positive values");
  }
  
  return waist / hip;
};

export const getWHRStatus = (whr: number, gender: 'male' | 'female'): HealthStatus => {
  if (isNaN(whr) || whr <= 0) {
    return "neutral";
  }
  
  if (gender === 'male') {
    if (whr <= 0.90) return 'optimal';
    if (whr <= 0.95) return 'warning';
    return 'risk';
  } else {
    if (whr <= 0.80) return 'optimal';
    if (whr <= 0.85) return 'warning';
    return 'risk';
  }
};

export const getWHRDescription = (whr: number, gender: 'male' | 'female'): string => {
  if (gender === 'male') {
    if (whr < 0.90) return 'Low Risk';
    if (whr >= 0.90 && whr <= 0.95) return 'Moderate Risk';
    return 'High Risk';
  } else {
    if (whr < 0.80) return 'Low Risk';
    if (whr >= 0.80 && whr <= 0.85) return 'Moderate Risk';
    return 'High Risk';
  }
};

export const calculateWHRWithStatus = (input: WHRInput): CalculationResult<number> => {
  const whrValue = calculateWHR(input);
  return {
    value: whrValue,
    status: getWHRStatus(whrValue, input.gender),
    description: getWHRDescription(whrValue, input.gender)
  };
};
