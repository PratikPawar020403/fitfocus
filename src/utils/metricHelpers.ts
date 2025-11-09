
import { UserMetrics } from "./storage";

/**
 * Checks if the metrics object has any valid metrics (not just lastUpdated)
 */
export const hasValidMetrics = (metrics: UserMetrics): boolean => {
  return Object.keys(metrics).length > 0 && 
    Object.keys(metrics).some(key => key !== 'lastUpdated');
};

/**
 * Gets a formatted string representation of a health metric with units
 */
export const formatMetricWithUnit = (
  value: number | undefined, 
  unit: string, 
  decimals: number = 1
): string => {
  if (value === undefined) return 'N/A';
  return `${value.toFixed(decimals)} ${unit}`;
};

/**
 * Validates that a measurement is within realistic human ranges
 * @param value The measurement value
 * @param min Minimum realistic value
 * @param max Maximum realistic value
 * @param metricName Name of the metric for error messaging
 */
export const validateMeasurement = (
  value: number,
  min: number,
  max: number,
  metricName: string
): boolean => {
  if (value < min || value > max) {
    console.warn(`${metricName} value ${value} is outside realistic range (${min}-${max})`);
    return false;
  }
  return true;
};

/**
 * Converts pounds to kilograms (Fix #6)
 */
export const lbsToKg = (lbs: number): number => {
  return lbs / 2.20462;
};

/**
 * Converts kilograms to pounds (Fix #6)
 */
export const kgToLbs = (kg: number): number => {
  return kg * 2.20462;
};

/**
 * Converts inches to centimeters (Fix #6)
 */
export const inchesToCm = (inches: number): number => {
  return inches * 2.54;
};

/**
 * Converts centimeters to inches (Fix #6)
 */
export const cmToInches = (cm: number): number => {
  return cm / 2.54;
};

/**
 * Enhanced body fat percentage Navy method validation for females (Fix #2)
 * @param waist Waist measurement in cm
 * @param hip Hip measurement in cm
 * @param gender Gender ('male' or 'female')
 */
export const validateBodyFatMeasurements = (
  waist: number,
  hip: number | undefined,
  gender: 'male' | 'female'
): boolean => {
  if (gender === 'female' && hip !== undefined) {
    // For females, hip should be greater than waist for realistic body shape
    if (hip <= waist) {
      console.warn('Hip measurement should be greater than waist measurement for females');
      return false;
    }
  }
  return true;
};

/**
 * Adjusts water intake based on climate and exercise (Fix #2)
 * @param baseIntake Base water intake in ml
 * @param climate Climate type
 * @param exercise Whether exercise was performed
 */
export const adjustWaterIntake = (
  baseIntake: number,
  climate?: 'temperate' | 'hot' | 'cold',
  exercise?: boolean
): number => {
  let adjustedIntake = baseIntake;
  
  // Climate adjustments
  if (climate === 'hot') {
    adjustedIntake += 500; // Add 500ml for hot climates
  } else if (climate === 'cold') {
    adjustedIntake -= 200; // Slightly reduce for cold climates
  }
  
  // Exercise adjustment
  if (exercise) {
    adjustedIntake += 500; // Add 500ml for exercise days
  }
  
  return adjustedIntake;
};

/**
 * Calculate Karvonen Target Heart Rate (Fix #4)
 * @param age Age in years
 * @param restingHR Resting heart rate
 * @param intensityLower Lower intensity percentage (0-100)
 * @param intensityUpper Upper intensity percentage (0-100)
 */
export const calculateKarvonenTHR = (
  age: number,
  restingHR: number,
  intensityLower: number,
  intensityUpper: number
): { lower: number; upper: number } => {
  // Using Tanaka formula for max heart rate: 208 - (0.7 * age)
  const maxHR = 208 - (0.7 * age);
  const hrReserve = maxHR - restingHR;
  
  return {
    lower: Math.round(restingHR + (hrReserve * intensityLower / 100)),
    upper: Math.round(restingHR + (hrReserve * intensityUpper / 100))
  };
};

/**
 * Calculate Visceral Adiposity Index (VAI) (Fix #4)
 * @param waist Waist circumference in cm
 * @param triglycerides Triglycerides in mg/dL
 * @param hdl HDL cholesterol in mg/dL
 * @param gender Gender ('male' or 'female')
 */
export const calculateVAI = (
  waist: number,
  triglycerides: number,
  hdl: number,
  gender: 'male' | 'female'
): number => {
  if (gender === 'male') {
    return (waist / 39.68) * (triglycerides / 88.5) / (1.31 / hdl);
  } else {
    return (waist / 36.58) * (triglycerides / 88.5) / (1.52 / hdl);
  }
};

/**
 * Calculate composite metabolic risk score (Fix #7)
 * @param bmi BMI value
 * @param absi ABSI value
 * @param absiZScore ABSI Z-score (if available)
 * @param bri BRI value
 */
export const calculateMetabolicRiskScore = (
  bmi: number,
  absi: number,
  bri: number,
  absiZScore?: number
): number => {
  // Normalize values to similar scales
  const normalizedBMI = bmi / 30; // Normalize to 1.0 at BMI of 30
  
  // Use Z-score if available, otherwise normalize raw ABSI
  const normalizedABSI = absiZScore !== undefined ? 
    Math.abs(absiZScore) / 2 : // Normalize to 1.0 at 2 standard deviations
    absi / 0.08; // Normalize to approximately 1.0 at ABSI of 0.08
  
  const normalizedBRI = bri / 7; // Normalize to 1.0 at BRI of 7 (high risk threshold)
  
  // Weighted composite score
  return (0.3 * normalizedBMI) + (0.4 * normalizedABSI) + (0.3 * normalizedBRI);
};
