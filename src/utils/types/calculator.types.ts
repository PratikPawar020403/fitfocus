import { HealthStatus } from "@/lib/utils";

// Generic interfaces
export interface CalculationResult<T> {
  value: T;
  status?: HealthStatus;
  description?: string;
}

// BMI Types
export interface BMIInput {
  weight: number; // in kg
  height: number; // in cm
  age?: number;   // Added age parameter for senior-specific BMI categories (Fix #3)
  ethnicity?: string; // Added ethnicity for adjusted thresholds (Fix #3)
}

export interface BMIResult extends CalculationResult<number> {
  category: string;
}

// Body Fat Types
export interface BodyFatInput {
  waist: number; // in cm
  neck: number; // in cm
  height: number; // in cm
  gender: 'male' | 'female';
  hip?: number; // in cm, required for females
}

export interface RFMInput {
  height: number; // in cm
  waist: number; // in cm
  gender: 'male' | 'female';
}

// BMR Types
export interface BMRInput {
  weight: number; // in kg
  height: number; // in cm
  age: number; // in years
  gender: 'male' | 'female';
}

// Waist Ratio Types
export interface WHRInput {
  waist: number; // in cm
  hip: number; // in cm
  gender: 'male' | 'female';
  ethnicity?: string; // Added for ethnicity-specific thresholds (Fix #3)
}

export interface WHtRInput {
  waist: number; // in cm
  height: number; // in cm
}

// Body Shape Indices
export interface ABSIInput {
  waist: number; // in cm
  weight: number; // in kg
  height: number; // in cm
  gender: 'male' | 'female';
  age?: number; // Added for age-specific interpretation (Fix #3)
}

export interface BRIInput {
  waist: number; // in cm
  height: number; // in cm
  age?: number; // Added for potential age adjustments (Fix #3)
}

// Fitness Types
export interface HeartRateInput {
  age: number;
  restingHR?: number;
}

export interface HeartRateZone {
  lower: number;
  upper: number;
}

// Metabolism Types
export interface TDEEInput {
  bmr: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active' | 'extra-active';
}

export interface MacroRatioInput {
  calories: number;
  ratio: {
    protein: number; // percentage
    carbs: number; // percentage
    fat: number; // percentage
  };
}

export interface MacroResult {
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

// Hydration Types
export interface WaterIntakeInput {
  weight: number; // in kg
  activityLevel?: string;
  climate?: 'temperate' | 'hot' | 'cold'; // Added climate parameter (Fix #2)
  exercise?: boolean; // Added exercise parameter (Fix #2)
}

// Other calculation types
export interface BSAInput {
  weight: number; // in kg
  height: number; // in cm
}

export interface SleepEfficiencyInput {
  totalSleepTimeMinutes: number;
  totalTimeInBedMinutes: number;
}

// Strength metrics types
export interface WilksInput {
  bodyWeight: number; // in kg
  totalWeight: number; // in kg (sum of squat, bench, deadlift)
  gender: 'male' | 'female';
}

// New interface for Karvonen method (Fix #4)
export interface KarvonenInput {
  age: number;
  restingHR: number;
  intensity: {
    lower: number; // percentage (0-100)
    upper: number; // percentage (0-100)
  };
}

// New interface for Visceral Adiposity Index (Fix #4)
export interface VAIInput {
  waist: number; // in cm
  triglycerides: number; // in mg/dL
  hdl: number; // in mg/dL
  gender: 'male' | 'female';
}

// Composite Risk Score interface (Fix #7)
export interface CompositeRiskInput {
  bmi: number;
  absi: number;
  absiZScore?: number;
  bri: number;
}
