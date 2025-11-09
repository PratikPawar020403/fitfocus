
import { HealthStatus } from "@/lib/utils";
import { 
  BSAInput, 
  WaterIntakeInput, 
  SleepEfficiencyInput, 
  CalculationResult 
} from "../types/calculator.types";

// Body Surface Area (BSA) Calculator (DuBois Formula)
export const calculateBSA = ({ weight, height }: BSAInput): number => {
  // Validation
  if (weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be positive values");
  }
  
  // Weight in kg, height in cm
  return 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
};

// Water Intake Calculator
export const calculateWaterIntake = ({ weight, activityLevel }: WaterIntakeInput): number => {
  // Validation
  if (weight <= 0) {
    throw new Error("Weight must be a positive value");
  }
  
  // Weight in kg, result in liters
  const baseIntake = weight * 0.033;
  
  // Adjust for activity level
  switch (activityLevel) {
    case 'sedentary':
      return baseIntake;
    case 'light':
      return baseIntake * 1.1;
    case 'moderate':
      return baseIntake * 1.2;
    case 'active':
      return baseIntake * 1.3;
    case 'very-active':
      return baseIntake * 1.4;
    default:
      return baseIntake;
  }
};

// Alternative Water Intake (based on lbs to oz)
export const calculateWaterIntakeImperial = (weightLbs: number): number => {
  // Validation
  if (weightLbs <= 0) {
    throw new Error("Weight must be a positive value");
  }
  
  // Weight in pounds, result in ounces
  const ouncesOfWater = weightLbs * 0.5;
  // Convert to liters (1 oz ≈ 0.0295735 liters)
  return ouncesOfWater * 0.0295735;
};

// Sleep Efficiency
export const calculateSleepEfficiency = (
  { totalSleepTimeMinutes, totalTimeInBedMinutes }: SleepEfficiencyInput
): number => {
  // Validation
  if (totalSleepTimeMinutes <= 0 || totalTimeInBedMinutes <= 0) {
    throw new Error("Sleep and bed times must be positive values");
  }
  
  if (totalSleepTimeMinutes > totalTimeInBedMinutes) {
    throw new Error("Sleep time cannot exceed time in bed");
  }
  
  return (totalSleepTimeMinutes / totalTimeInBedMinutes) * 100;
};

export const getSleepEfficiencyStatus = (efficiency: number): HealthStatus => {
  if (isNaN(efficiency) || efficiency < 0 || efficiency > 100) {
    return "neutral";
  }
  
  if (efficiency >= 85) return 'optimal';
  if (efficiency >= 75 && efficiency < 85) return 'warning';
  return 'risk';
};

export const calculateSleepEfficiencyWithStatus = (
  input: SleepEfficiencyInput
): CalculationResult<number> => {
  const efficiencyValue = calculateSleepEfficiency(input);
  return {
    value: efficiencyValue,
    status: getSleepEfficiencyStatus(efficiencyValue),
    description: getSleepEfficiencyDescription(efficiencyValue)
  };
};

export const getSleepEfficiencyDescription = (efficiency: number): string => {
  if (efficiency >= 90) return 'Excellent';
  if (efficiency >= 85 && efficiency < 90) return 'Very Good';
  if (efficiency >= 80 && efficiency < 85) return 'Good';
  if (efficiency >= 75 && efficiency < 80) return 'Fair';
  return 'Poor';
};
