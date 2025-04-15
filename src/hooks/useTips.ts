
import { useMemo } from "react";
import { UserMetrics } from "@/utils/storage";

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  type: 'warning' | 'primary' | 'risk' | 'optimal';
}

export const useTips = (metrics: UserMetrics) => {
  return useMemo(() => {
    // Define all possible health tips
    const availableTips: (HealthTip & { condition: (metrics: UserMetrics) => boolean })[] = [
      {
        id: 'weight-management',
        title: 'Weight Management',
        content: 'Consider a moderate calorie deficit of 300-500 calories per day for healthy weight loss.',
        type: 'warning',
        condition: (m) => Boolean(m.bmi && m.bmi > 25)
      },
      {
        id: 'hydration',
        title: 'Hydration',
        content: `Aim to drink ${metrics.waterIntake?.toFixed(1) || '2.0'} liters of water daily for optimal hydration.`,
        type: 'primary',
        condition: (m) => Boolean(m.waterIntake)
      },
      {
        id: 'stress-management',
        title: 'Stress Management',
        content: 'Your stress level is elevated. Consider mindfulness practices, regular exercise, or speaking with a professional.',
        type: 'risk',
        condition: (m) => Boolean(m.stressLevel && m.stressLevel > 6)
      },
      {
        id: 'general-wellness',
        title: 'General Wellness',
        content: 'Regular physical activity of 150+ minutes per week supports overall health and well-being.',
        type: 'optimal',
        condition: (m) => Boolean(!m.stressLevel || m.stressLevel <= 6)
      }
    ];

    // Filter tips based on user metrics
    return availableTips.filter(tip => tip.condition(metrics));
  }, [metrics]);
};
