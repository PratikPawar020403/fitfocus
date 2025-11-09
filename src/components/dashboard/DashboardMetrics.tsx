import React from "react";
import { UserMetrics } from "@/utils/storage";
import BodyCompositionMetrics from "./metrics/BodyCompositionMetrics";
import CardiovascularMetrics from "./metrics/CardiovascularMetrics";
import MetabolicMetrics from "./metrics/MetabolicMetrics";
import LifestyleMetrics from "./metrics/LifestyleMetrics";

interface DashboardMetricsProps {
  metrics: UserMetrics;
  profile: { gender?: 'male' | 'female'; age?: number };
  onMetricClick: (calculator: string) => void;
}

const DashboardMetrics = ({ metrics, profile, onMetricClick }: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 animate-fade-in">
      {/* Body Composition Metrics */}
      <BodyCompositionMetrics 
        metrics={metrics} 
        profile={profile} 
        onMetricClick={onMetricClick} 
      />
      
      {/* Cardiovascular Health Metrics */}
      <CardiovascularMetrics 
        metrics={metrics} 
        onMetricClick={onMetricClick} 
      />
      
      {/* Metabolic Metrics */}
      <MetabolicMetrics 
        metrics={metrics} 
        onMetricClick={onMetricClick} 
      />
      
      {/* Lifestyle Metrics */}
      <LifestyleMetrics 
        metrics={metrics} 
        profile={profile} 
        onMetricClick={onMetricClick} 
      />
    </div>
  );
};

export default DashboardMetrics;
