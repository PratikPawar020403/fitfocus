
import React from "react";
import MetricCard from "../../ui-custom/MetricCard";
import { HeartPulse, Heart, Clock } from "lucide-react";
import { UserMetrics } from "@/utils/storage";
import { getRHRStatus } from "@/utils/calculators";

interface CardiovascularMetricsProps {
  metrics: UserMetrics;
  onMetricClick: (calculator: string) => void;
}

const CardiovascularMetrics: React.FC<CardiovascularMetricsProps> = ({ 
  metrics, 
  onMetricClick 
}) => {
  return (
    <>
      {metrics.restingHeartRate && (
        <MetricCard
          title="RHR"
          value={metrics.restingHeartRate}
          icon={HeartPulse}
          unit="bpm"
          status={getRHRStatus(metrics.restingHeartRate)}
          description="Resting Heart Rate"
          onClick={() => onMetricClick('heart-rate')}
          tooltipText="Resting Heart Rate - Beats per minute at rest"
        />
      )}
      
      {metrics.mhr && (
        <MetricCard
          title="MHR"
          value={metrics.mhr}
          icon={Heart}
          unit="bpm"
          description="Maximum Heart Rate"
          onClick={() => onMetricClick('heart-rate')}
          tooltipText="Maximum Heart Rate - 220 minus age"
        />
      )}
      
      {metrics.targetHeartRate && (
        <MetricCard
          title="THR Zone"
          value={`${metrics.targetHeartRate.lower}-${metrics.targetHeartRate.upper}`}
          icon={Clock}
          unit="bpm"
          description="Target Heart Rate"
          onClick={() => onMetricClick('heart-rate')}
          tooltipText="Target Heart Rate Zone - Optimal range for exercise"
        />
      )}
    </>
  );
};

export default CardiovascularMetrics;
