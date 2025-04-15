
import { SleepEfficiencyInput, CalculationResult } from "../types/calculator.types";
import { HealthStatus, formatTime } from "@/lib/utils";

/**
 * Calculate sleep efficiency percentage
 * Formula: (Total Sleep Time ÷ Total Time in Bed) × 100
 */
export const calculateSleepEfficiency = (
  { totalSleepTimeMinutes, totalTimeInBedMinutes }: SleepEfficiencyInput
): number => {
  if (totalTimeInBedMinutes === 0) {
    throw new Error("Total time in bed cannot be zero");
  }
  
  const efficiency = (totalSleepTimeMinutes / totalTimeInBedMinutes) * 100;
  return Math.round(efficiency * 10) / 10; // Round to 1 decimal place
};

/**
 * Get status for sleep efficiency percentage
 */
export const getSleepEfficiencyStatus = (efficiency: number): HealthStatus => {
  if (efficiency >= 85) return 'optimal';
  if (efficiency >= 75 && efficiency < 85) return 'warning';
  return 'risk';
};

/**
 * Calculate sleep efficiency with status
 */
export const calculateSleepEfficiencyWithStatus = 
  (data: SleepEfficiencyInput): CalculationResult<number> => {
  const efficiency = calculateSleepEfficiency(data);
  const status = getSleepEfficiencyStatus(efficiency);
  
  return {
    value: efficiency,
    status: status,
    description: getSleepEfficiencyDescription(efficiency)
  };
};

/**
 * Get description for sleep efficiency
 */
export const getSleepEfficiencyDescription = (efficiency: number): string => {
  if (efficiency >= 85) return 'Good';
  if (efficiency >= 75 && efficiency < 85) return 'Fair';
  return 'Poor';
};
