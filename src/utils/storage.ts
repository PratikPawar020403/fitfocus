// Type definitions for metrics and health data
export interface UserMetrics {
  bmi?: number;
  bmr?: number;
  bodyFatPercentage?: number;
  rfm?: number; // Relative Fat Mass
  idealWeight?: number;
  lbm?: number; // Lean Body Mass
  whr?: number; // Waist-to-Hip Ratio
  whtr?: number; // Waist-to-Height Ratio
  absi?: number; // A Body Shape Index
  bri?: number; // Body Roundness Index
  frameSize?: string;
  bodySurface?: number;
  mhr?: number; // Maximum Heart Rate
  targetHeartRate?: { lower: number; upper: number }; // Target Heart Rate Zone
  restingHeartRate?: number; // Resting Heart Rate
  tdee?: number; // Total Daily Energy Expenditure
  calorieNeeds?: number;
  macroRatio?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  waterIntake?: number;
  dailySteps?: number; // Daily Steps Count
  sleepEfficiency?: number; // Sleep Efficiency Percentage
  wilksScore?: number; // Wilks Coefficient Score
  stressLevel?: number;
  sleepQuality?: number;
  lastUpdated?: number; // timestamp
  // New BMI-specific fields
  bmiImperial?: number; // BMI calculated using imperial units
  bmiStatus?: string; // Underweight, Normal, Overweight, etc.
  // Composite risk score field
  compositeRisk?: number; // Composite metabolic risk score
}

export interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  weight?: number; // in kg
  weightImperial?: number; // in lb
  height?: number; // in cm
  heightImperial?: number; // in inches
  waist?: number; // in cm
  hip?: number; // in cm
  neck?: number; // in cm
  wrist?: number; // in cm for frame size
  restingHR?: number; // Resting Heart Rate
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active' | 'extra-active';
}

// Prefix for all storage keys
const STORAGE_PREFIX = 'health-metrics-';

// Storage keys
const KEYS = {
  METRICS: `${STORAGE_PREFIX}user-metrics`,
  PROFILE: `${STORAGE_PREFIX}user-profile`,
};

// Storage utility functions
export const storage = {
  getMetrics(): UserMetrics {
    try {
      const metrics = localStorage.getItem(KEYS.METRICS);
      return metrics ? JSON.parse(metrics) : {};
    } catch (error) {
      console.error('Error getting metrics from localStorage', error);
      return {};
    }
  },

  saveMetrics(metrics: UserMetrics): void {
    try {
      const currentMetrics = this.getMetrics();
      const updatedMetrics = {
        ...currentMetrics,
        ...metrics,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(KEYS.METRICS, JSON.stringify(updatedMetrics));
    } catch (error) {
      console.error('Error saving metrics to localStorage', error);
    }
  },

  saveMetric<K extends keyof UserMetrics>(key: K, value: UserMetrics[K]): void {
    try {
      const metrics = this.getMetrics();
      metrics[key] = value;
      metrics.lastUpdated = Date.now();
      localStorage.setItem(KEYS.METRICS, JSON.stringify(metrics));
    } catch (error) {
      console.error(`Error saving ${String(key)} to localStorage`, error);
    }
  },

  getProfile(): UserProfile {
    try {
      const profile = localStorage.getItem(KEYS.PROFILE);
      return profile ? JSON.parse(profile) : {};
    } catch (error) {
      console.error('Error getting profile from localStorage', error);
      return {};
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      const currentProfile = this.getProfile();
      const updatedProfile = {
        ...currentProfile,
        ...profile,
      };
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error saving profile to localStorage', error);
    }
  },

  clearAll(): void {
    try {
      localStorage.removeItem(KEYS.METRICS);
      localStorage.removeItem(KEYS.PROFILE);
      localStorage.removeItem("has-visited-dashboard");
      console.log('All metrics and profile data have been cleared');
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
};
