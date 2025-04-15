
import { WaterIntakeInput, CalculationResult } from "../types/calculator.types";
import { HealthStatus, lbsToKg, kgToLbs } from "@/lib/utils";

/**
 * Calculate daily water intake needs based on body weight
 * Formula: Approximately half body weight (lbs) in ounces of water per day
 * @param weight Weight in kg
 */
export const calculateWaterIntake = (weight: number): number => {
  // Convert kg to lbs for calculation
  const weightLbs = kgToLbs(weight);
  
  // Calculate water in ounces (half body weight in lbs)
  const waterOz = weightLbs / 2;
  
  // Convert ounces to liters (1 oz ≈ 0.0295735 L)
  const waterL = waterOz * 0.0295735;
  
  // Round to 1 decimal place
  return Math.round(waterL * 10) / 10;
};

/**
 * Calculate water intake with status
 */
export const calculateWaterIntakeWithStatus = 
  (weight: number): CalculationResult<number> => {
  const waterIntake = calculateWaterIntake(weight);
  
  return {
    value: waterIntake,
    status: "neutral", // Water intake doesn't have standard status categories
    description: getWaterIntakeDescription(waterIntake)
  };
};

/**
 * Get description for water intake amount
 */
export const getWaterIntakeDescription = (waterL: number): string => {
  // General recommendation descriptions
  if (waterL < 1.5) return "Below general recommendations";
  if (waterL >= 1.5 && waterL <= 3.0) return "Within general recommendations";
  return "Above general recommendations";
};
