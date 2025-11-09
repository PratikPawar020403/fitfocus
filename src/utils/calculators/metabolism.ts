
import { 
  BMRInput, 
  TDEEInput, 
  MacroRatioInput, 
  MacroResult 
} from "../types/calculator.types";

// BMR Calculator (Mifflin-St Jeor Equation)
export const calculateBMR = ({ weight, height, age, gender }: BMRInput): number => {
  // Validation
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error("Weight, height, and age must be positive values");
  }
  
  // Weight in kg, height in cm, age in years
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Revised Harris-Benedict Equation for BMR
export const calculateRevisedHarrisBenedictBMR = ({ weight, height, age, gender }: BMRInput): number => {
  // Validation
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error("Weight, height, and age must be positive values");
  }
  
  // Weight in kg, height in cm, age in years
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

// Original Harris-Benedict Equation for BMR
export const calculateOriginalHarrisBenedictBMR = ({ weight, height, age, gender }: BMRInput): number => {
  // Validation
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error("Weight, height, and age must be positive values");
  }
  
  // Weight in kg, height in cm, age in years
  if (gender === 'male') {
    return 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
  } else {
    return 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
  }
};

// Total Daily Energy Expenditure (TDEE)
export const calculateTDEE = ({ bmr, activityLevel }: TDEEInput): number => {
  // Validation
  if (bmr <= 0) {
    throw new Error("BMR must be a positive value");
  }
  
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days per week
    moderate: 1.55, // Moderate exercise 3-5 days per week
    active: 1.725, // Hard exercise 6-7 days per week
    'very-active': 1.9, // Very hard exercise & physical job or 2x training
    'extra-active': 2.3 // Professional athlete level
  };
  
  return bmr * activityMultipliers[activityLevel];
};
