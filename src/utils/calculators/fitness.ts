
import { HealthStatus } from "@/lib/utils";
import { HeartRateInput, HeartRateZone, CalculationResult, KarvonenInput } from "../types/calculator.types";

// Maximum Heart Rate
export const calculateMHR = (age: number): number => {
  // Validation
  if (age <= 0) {
    throw new Error("Age must be a positive value");
  }
  
  // Age in years - updated to use Tanaka formula (Fix #4)
  return 208 - (0.7 * age); // Tanaka formula is more accurate than the old 220-age
};

// Target Heart Rate Zone
export const calculateTargetHeartRate = (
  age: number,
  intensity: 'moderate' | 'vigorous'
): HeartRateZone => {
  // Validation
  if (age <= 0) {
    throw new Error("Age must be a positive value");
  }
  
  const mhr = calculateMHR(age);
  
  if (intensity === 'moderate') {
    return {
      lower: Math.round(mhr * 0.5),
      upper: Math.round(mhr * 0.7)
    };
  } else {
    return {
      lower: Math.round(mhr * 0.7),
      upper: Math.round(mhr * 0.85)
    };
  }
};

// Karvonen Formula for Target Heart Rate
export const calculateKarvonenTHR = (
  input: KarvonenInput
): HeartRateZone => {
  const { age, restingHR, intensity } = input;
  
  // Validation
  if (age <= 0) {
    throw new Error("Age must be a positive value");
  }
  
  if (restingHR <= 0) {
    throw new Error("Resting heart rate must be a positive value");
  }
  
  // Updated to use Tanaka formula (Fix #4)
  const mhr = 208 - (0.7 * age);
  const hrReserve = mhr - restingHR;
  
  return {
    lower: Math.round(restingHR + (hrReserve * (intensity.lower / 100))),
    upper: Math.round(restingHR + (hrReserve * (intensity.upper / 100)))
  };
};

// Resting Heart Rate Status
export const getRHRStatus = (rhr: number): HealthStatus => {
  if (isNaN(rhr) || rhr <= 0) {
    return "neutral";
  }
  
  if (rhr < 60) return 'optimal'; // Athletic/Excellent
  if (rhr >= 60 && rhr <= 70) return 'optimal'; // Good
  if (rhr > 70 && rhr <= 80) return 'warning'; // Average
  if (rhr > 80 && rhr <= 100) return 'warning'; // Above Average/High
  return 'risk'; // Tachycardia
};

export const getRHRWithStatus = (rhr: number): CalculationResult<number> => {
  return {
    value: rhr,
    status: getRHRStatus(rhr),
    description: getRHRDescription(rhr)
  };
};

export const getRHRDescription = (rhr: number): string => {
  if (rhr < 60) return 'Athletic';
  if (rhr >= 60 && rhr <= 70) return 'Good';
  if (rhr > 70 && rhr <= 80) return 'Average';
  if (rhr > 80 && rhr <= 100) return 'Above Average';
  return 'High (Tachycardia)';
};

// Daily Steps Status with age-specific adjustments (Fix #3)
export const getStepsStatus = (steps: number, age: number): HealthStatus => {
  if (isNaN(steps) || steps < 0 || age <= 0) {
    return "neutral";
  }
  
  // Updated thresholds for seniors (Fix #3)
  if (age >= 65) {
    if (steps >= 6000) return 'optimal';
    if (steps >= 3000 && steps < 6000) return 'warning';
    return 'risk';
  } else if (age >= 50) {
    if (steps >= 7000) return 'optimal';
    if (steps >= 4000 && steps < 7000) return 'warning';
    return 'risk';
  } else {
    if (steps >= 8000) return 'optimal';
    if (steps >= 5000 && steps < 8000) return 'warning';
    return 'risk';
  }
};

export const getStepsWithStatus = (steps: number, age: number): CalculationResult<number> => {
  return {
    value: steps,
    status: getStepsStatus(steps, age),
    description: getStepsDescription(steps, age)
  };
};

export const getStepsDescription = (steps: number, age: number): string => {
  // Age-specific interpretations (Fix #3)
  if (age >= 65) {
    if (steps >= 8000) return 'Excellent for Your Age';
    if (steps >= 6000) return 'Very Good for Your Age';
    if (steps >= 3000 && steps < 6000) return 'Moderate for Your Age';
    return 'Low for Your Age';
  } else if (age >= 50) {
    if (steps >= 10000) return 'Very Active';
    if (steps >= 7000) return 'Active';
    if (steps >= 4000 && steps < 7000) return 'Moderate';
    return 'Sedentary';
  } else {
    if (steps >= 10000) return 'Very Active';
    if (steps >= 8000 && steps < 10000) return 'Active';
    if (steps >= 5000 && steps < 8000) return 'Moderate';
    return 'Sedentary';
  }
};
