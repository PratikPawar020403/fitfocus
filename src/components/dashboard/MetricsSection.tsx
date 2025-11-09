
import React from "react";
import { UserMetrics } from "@/utils/storage";
import DashboardMetrics from "./DashboardMetrics";
import HealthSummary from "./HealthSummary";
import HealthTips from "./HealthTips";

interface MetricsSectionProps {
  metrics: UserMetrics;
  profile: {
    gender?: 'male' | 'female';
    age?: number;
    weight?: number;
    height?: number;
    waist?: number;
    hip?: number;
    neck?: number;
    wrist?: number;
    restingHR?: number;
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active' | 'extra-active';
  };
  onMetricClick: (calculator: string) => void;
}

const MetricsSection = ({ metrics, profile, onMetricClick }: MetricsSectionProps) => {
  return (
    <>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Your Health Metrics</h2>
        <DashboardMetrics 
          metrics={metrics} 
          profile={profile} 
          onMetricClick={onMetricClick} 
        />
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <HealthSummary metrics={metrics} profile={profile} />
        <HealthTips metrics={metrics} />
      </div>
    </>
  );
};

export default MetricsSection;
