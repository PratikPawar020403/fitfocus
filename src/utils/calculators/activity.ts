
import { HealthStatus } from "@/lib/utils";
import { CalculationResult } from "../types/calculator.types";

/**
 * Get status for daily steps based on count and age
 */
export const getStepsStatus = (steps: number, age: number): HealthStatus => {
  if (isNaN(steps) || steps < 0 || age <= 0) {
    return "neutral";
  }
  
  if (age >= 60) {
    if (steps >= 6000) return 'optimal';
    if (steps >= 3000 && steps < 6000) return 'warning';
    return 'risk';
  } else {
    if (steps >= 8000) return 'optimal';
    if (steps >= 5000 && steps < 8000) return 'warning';
    return 'risk';
  }
};

/**
 * Get steps with status assessment
 */
export const getStepsWithStatus = (steps: number, age: number): CalculationResult<number> => {
  const status = getStepsStatus(steps, age);
  return {
    value: steps,
    status: status,
    description: getStepsDescription(steps, age)
  };
};

/**
 * Get description for daily steps count based on age
 */
export const getStepsDescription = (steps: number, age: number): string => {
  if (age >= 60) {
    if (steps >= 6000) return 'Excellent';
    if (steps >= 3000 && steps < 6000) return 'Moderate';
    return 'Low';
  } else {
    if (steps >= 10000) return 'Very Active';
    if (steps >= 8000 && steps < 10000) return 'Active';
    if (steps >= 5000 && steps < 8000) return 'Moderate';
    return 'Sedentary';
  }
};
