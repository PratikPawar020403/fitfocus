
// Re-export all specified calculator functions for easy importing
export * from './bodyComposition';
export { 
  calculateWHR,
  calculateWHRWithStatus,
  getWHRStatus,
  getWHRDescription,
  calculateWHtR,
  calculateWHtRWithStatus,
  getWHtRStatus,
  getWHtRDescription,
  // ABSI functions
  calculateABSI,
  calculateABSIWithStatus,
  getABSIStatus,
  getABSIDescription,
  // BRI functions
  calculateBRI,
  calculateBRIWithStatus,
  getBRIStatus,
  getBRIDescription
} from './waistRatios';

// Re-export metabolism functions needed for BMR calculator
export * from './metabolism';

// Export the fitness functions for heart rate calculations
export {
  calculateMHR,
  calculateTargetHeartRate,
  calculateKarvonenTHR,
  getRHRStatus,
  getRHRWithStatus,
  getRHRDescription,
  getStepsStatus,
  getStepsWithStatus,
  getStepsDescription
} from './fitness';

// Export strength calculations for Wilks coefficient
export {
  calculateWilks,
  calculateWilksWithStatus,
  getWilksStatus,
  getWilksDescription
} from './strength';

// Export additional metric calculation functions
export * from './hydration';
export * from './activity';
export * from './sleep';
