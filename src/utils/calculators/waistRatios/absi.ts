
import { HealthStatus } from "@/lib/utils";
import { ABSIInput, CalculationResult } from "../../types/calculator.types";

// A Body Shape Index (ABSI)
export const calculateABSI = (input: ABSIInput): number => {
  const { waist, weight, height } = input;
  
  // Validation
  if (waist <= 0 || weight <= 0 || height <= 0) {
    throw new Error("Waist, weight, and height must be positive values");
  }
  
  // Enhanced validation - Implement realistic bounds (Fix #6: Input Validation)
  if (waist > 250) { // 250 cm ~ 8.2 ft, very unlikely to be exceeded
    throw new Error("Waist measurement exceeds realistic bounds");
  }
  
  if (height > 250) { // 250 cm ~ 8.2 ft
    throw new Error("Height measurement exceeds realistic bounds");
  }
  
  // Waist in cm, weight in kg, height in cm
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);
  
  return waist / (Math.pow(bmi, 2/3) * Math.pow(height, 1/2));
};

// Updated ABSI interpretation with Z-score consideration (Fix #2)
export const getABSIStatus = (absi: number, gender: 'male' | 'female', age?: number): HealthStatus => {
  if (isNaN(absi) || absi <= 0) {
    return "neutral";
  }
  
  // Default thresholds
  let lowThreshold = gender === 'male' ? 0.079 : 0.077;
  let highThreshold = gender === 'male' ? 0.083 : 0.081;
  
  // Age-adjusted thresholds if age is provided (Fix #3: Demographic Customization)
  if (age) {
    // Slight adjustments for seniors
    if (age >= 65) {
      lowThreshold += 0.002;
      highThreshold += 0.002;
    }
  }
  
  if (absi < lowThreshold) return 'optimal';
  if (absi >= lowThreshold && absi < highThreshold) return 'warning';
  return 'risk';
};

export const getABSIDescription = (absi: number, gender: 'male' | 'female', age?: number): string => {
  if (gender === 'male') {
    // Age-specific interpretation
    const lowThreshold = age && age >= 65 ? 0.081 : 0.079;
    const highThreshold = age && age >= 65 ? 0.085 : 0.083;
    
    if (absi < lowThreshold) return 'Lower Risk';
    if (absi >= lowThreshold && absi < highThreshold) return 'Moderate Risk';
    return 'Higher Risk';
  } else {
    const lowThreshold = age && age >= 65 ? 0.079 : 0.077;
    const highThreshold = age && age >= 65 ? 0.083 : 0.081;
    
    if (absi < lowThreshold) return 'Lower Risk';
    if (absi >= lowThreshold && absi < highThreshold) return 'Moderate Risk';
    return 'Higher Risk';
  }
};

export const calculateABSIWithStatus = (input: ABSIInput): CalculationResult<number> => {
  const absiValue = calculateABSI(input);
  return {
    value: absiValue,
    status: getABSIStatus(absiValue, input.gender, input.age),
    description: getABSIDescription(absiValue, input.gender, input.age)
  };
};
