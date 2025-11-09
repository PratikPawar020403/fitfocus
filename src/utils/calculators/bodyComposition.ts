
import { HealthStatus } from "@/lib/utils";
import { 
  BMIInput, 
  BMIResult,
  BodyFatInput, 
  RFMInput, 
  CalculationResult 
} from "../types/calculator.types";

// BMI Calculator
export const calculateBMI = ({ weight, height }: BMIInput): number => {
  if (weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be positive values");
  }
  
  // Weight in kg, height in cm
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// BMI Calculator (Imperial)
export const calculateBMIImperial = (weightLb: number, heightIn: number): number => {
  if (weightLb <= 0 || heightIn <= 0) {
    throw new Error("Weight and height must be positive values");
  }
  
  // Weight in pounds, height in inches
  return (weightLb * 703) / (heightIn * heightIn);
};

export const getBMIStatus = (bmi: number): HealthStatus => {
  if (isNaN(bmi) || bmi <= 0) {
    return "neutral";
  }
  
  if (bmi < 18.5) return 'warning'; // Underweight
  if (bmi >= 18.5 && bmi < 25) return 'optimal'; // Normal
  if (bmi >= 25 && bmi < 30) return 'warning'; // Overweight
  return 'risk'; // Obese
};

export const getBMIDescription = (bmi: number): string => {
  if (isNaN(bmi) || bmi <= 0) {
    return "Invalid BMI";
  }
  
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 25) return 'Healthy Weight';
  if (bmi >= 25 && bmi < 30) return 'Overweight';
  if (bmi >= 30 && bmi < 35) return 'Obesity Class I';
  if (bmi >= 35 && bmi < 40) return 'Obesity Class II';
  return 'Obesity Class III';
};

export const calculateBMIWithDetail = (input: BMIInput): BMIResult => {
  const bmiValue = calculateBMI(input);
  return {
    value: bmiValue,
    status: getBMIStatus(bmiValue),
    category: getBMIDescription(bmiValue)
  };
};

// Body Fat Percentage Calculator (Navy Method)
export const calculateBodyFat = (input: BodyFatInput): number => {
  const { waist, neck, height, gender, hip } = input;
  
  // Validation
  if (waist <= 0 || neck <= 0 || height <= 0) {
    throw new Error("Measurements must be positive values");
  }
  
  if (gender === 'female' && (!hip || hip <= 0)) {
    throw new Error("Hip measurement is required for female body fat calculation");
  }
  
  // All measurements in cm
  if (gender === 'male') {
    return 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    // Female calculation
    return 163.205 * Math.log10(waist + hip! - neck) - 97.684 * Math.log10(height) - 78.387;
  }
};

export const getBodyFatStatus = (bodyFat: number, gender: 'male' | 'female'): HealthStatus => {
  if (isNaN(bodyFat) || bodyFat < 0) {
    return "neutral";
  }
  
  if (gender === 'male') {
    if (bodyFat < 6) return 'warning'; // Essential fat
    if (bodyFat >= 6 && bodyFat < 14) return 'optimal'; // Athletes
    if (bodyFat >= 14 && bodyFat < 18) return 'optimal'; // Fitness
    if (bodyFat >= 18 && bodyFat < 25) return 'warning'; // Average
    return 'risk'; // Obese
  } else {
    if (bodyFat < 16) return 'warning'; // Essential fat
    if (bodyFat >= 16 && bodyFat < 23) return 'optimal'; // Athletes
    if (bodyFat >= 23 && bodyFat < 30) return 'optimal'; // Fitness
    if (bodyFat >= 30 && bodyFat < 35) return 'warning'; // Average
    return 'risk'; // Obese
  }
};

export const calculateBodyFatWithStatus = (input: BodyFatInput): CalculationResult<number> => {
  const bodyFatValue = calculateBodyFat(input);
  return {
    value: bodyFatValue,
    status: getBodyFatStatus(bodyFatValue, input.gender)
  };
};

// Relative Fat Mass (RFM) Calculator
export const calculateRFM = ({ height, waist, gender }: RFMInput): number => {
  // Validation
  if (waist <= 0 || height <= 0) {
    throw new Error("Waist and height must be positive values");
  }
  
  // Height and waist in cm
  if (gender === 'male') {
    return 64 - (20 * height / waist);
  } else {
    return 76 - (20 * height / waist);
  }
};

export const getRFMStatus = (rfm: number, gender: 'male' | 'female'): HealthStatus => {
  if (isNaN(rfm) || rfm < 0) {
    return "neutral";
  }
  
  // Status ranges similar to body fat percentage
  if (gender === 'male') {
    if (rfm < 6) return 'warning'; // Too low
    if (rfm >= 6 && rfm < 18) return 'optimal'; // Healthy
    if (rfm >= 18 && rfm < 25) return 'warning'; // Overweight
    return 'risk'; // Obese
  } else {
    if (rfm < 14) return 'warning'; // Too low
    if (rfm >= 14 && rfm < 30) return 'optimal'; // Healthy
    if (rfm >= 30 && rfm < 35) return 'warning'; // Overweight
    return 'risk'; // Obese
  }
};

export const calculateRFMWithStatus = (input: RFMInput): CalculationResult<number> => {
  const rfmValue = calculateRFM(input);
  return {
    value: rfmValue,
    status: getRFMStatus(rfmValue, input.gender),
    description: getRFMDescription(rfmValue, input.gender)
  };
};

// Function to get RFM description
export const getRFMDescription = (rfm: number, gender: 'male' | 'female'): string => {
  if (gender === 'male') {
    if (rfm < 6) return 'Very Low Fat (Potentially Unhealthy)';
    if (rfm >= 6 && rfm < 18) return 'Healthy Range';
    if (rfm >= 18 && rfm < 25) return 'Moderately High';
    return 'High Fat';
  } else {
    if (rfm < 14) return 'Very Low Fat (Potentially Unhealthy)';
    if (rfm >= 14 && rfm < 30) return 'Healthy Range';
    if (rfm >= 30 && rfm < 35) return 'Moderately High';
    return 'High Fat';
  }
};
