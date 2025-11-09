
import { HealthStatus } from "@/lib/utils";

interface WilksCoefficients {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

// Coefficients for male and female lifters - exactly as specified
const maleCoefficients: WilksCoefficients = {
  a: -216.0475144,
  b: 16.2606339,
  c: -0.002388645,
  d: -0.00113732,
  e: 0.00000701863, // 7.01863 × 10^-6
  f: -0.00000001291, // -1.291 × 10^-8
};

const femaleCoefficients: WilksCoefficients = {
  a: 594.31747775582,
  b: -27.23842536447,
  c: 0.82112226871,
  d: -0.00930733913,
  e: 0.00004731582, // 4.731582 × 10^-5
  f: -0.00000009054, // -9.054 × 10^-8
};

/**
 * Calculate the Wilks Coefficient
 * @param bodyWeight - Lifter's body weight in kilograms
 * @param gender - 'male' or 'female'
 * @returns Wilks coefficient (not rounded)
 */
export const calculateWilksCoefficient = (
  bodyWeight: number,
  gender: 'male' | 'female'
): number => {
  // Select correct coefficients based on gender
  const coefficients = gender === 'male' ? maleCoefficients : femaleCoefficients;
  
  // Calculate the denominator using the polynomial formula
  const x = bodyWeight;
  const denominator = 
    coefficients.a + 
    (coefficients.b * x) + 
    (coefficients.c * Math.pow(x, 2)) + 
    (coefficients.d * Math.pow(x, 3)) + 
    (coefficients.e * Math.pow(x, 4)) + 
    (coefficients.f * Math.pow(x, 5));
  
  // Calculate and return Wilks coefficient
  return 500 / denominator;
};

/**
 * Calculate the Wilks Score
 * @param bodyWeight - Lifter's body weight in kilograms
 * @param liftedWeight - Weight lifted (either single lift or total) in kilograms
 * @param gender - 'male' or 'female'
 * @returns Wilks score (rounded to 2 decimal places)
 */
export const calculateWilks = (
  bodyWeight: number, 
  liftedWeight: number, 
  gender: 'male' | 'female'
): number => {
  // Get the coefficient
  const coefficient = calculateWilksCoefficient(bodyWeight, gender);
  
  // Calculate Wilks score
  const wilksScore = liftedWeight * coefficient;
  
  // Return rounded score
  return Math.round(wilksScore * 100) / 100;
};

/**
 * Get the status based on Wilks score
 * @param wilksScore - The calculated Wilks score
 * @returns Status string and health status
 */
export const getWilksStatus = (wilksScore: number): HealthStatus => {
  if (wilksScore >= 500) {
    return "optimal";
  } else if (wilksScore >= 400) {
    return "optimal";
  } else if (wilksScore >= 300) {
    return "warning";
  } else if (wilksScore >= 200) {
    return "warning";
  } else {
    return "neutral";
  }
};

/**
 * Get description based on Wilks score
 * @param wilksScore - The calculated Wilks score
 * @returns A description of the Wilks score
 */
export const getWilksDescription = (wilksScore: number): string => {
  if (wilksScore >= 500) {
    return "Elite level strength - comparable to world-class powerlifters";
  } else if (wilksScore >= 450) {
    return "International level strength - competitive at international powerlifting meets";
  } else if (wilksScore >= 400) {
    return "Advanced level strength - competitive at national powerlifting meets";
  } else if (wilksScore >= 350) {
    return "Very good strength - above average for experienced lifters";
  } else if (wilksScore >= 300) {
    return "Intermediate strength - good progress for dedicated lifters";
  } else if (wilksScore >= 200) {
    return "Novice strength - developing good foundational strength";
  } else {
    return "Beginner strength - early stages of strength training";
  }
};

/**
 * Calculate Wilks score with status and description
 * @param data - Object containing bodyWeight, liftedWeight, gender, and liftType
 * @returns Object with Wilks score, status and description
 */
export const calculateWilksWithStatus = (
  data: { 
    bodyWeight: number; 
    liftedWeight: number; 
    gender: 'male' | 'female';
    liftType?: 'individual' | 'total';
  }
): {
  value: number;
  status: HealthStatus;
  description: string;
} => {
  const { bodyWeight, liftedWeight, gender, liftType = 'total' } = data;
  const wilksScore = calculateWilks(bodyWeight, liftedWeight, gender);
  const status = getWilksStatus(wilksScore);
  const description = getWilksDescription(wilksScore);
  
  return {
    value: wilksScore,
    status: status,
    description: description
  };
};
