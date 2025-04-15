
import React from "react";
import MetricCard from "../../ui-custom/MetricCard";
import { Droplet, Moon, Dumbbell } from "lucide-react";
import { Footprints } from "../../ui-custom/lucideIconImports";
import { UserMetrics } from "@/utils/storage";
import { getStepsStatus, getWilksStatus } from "@/utils/calculators";

interface LifestyleMetricsProps {
  metrics: UserMetrics;
  profile: { age?: number };
  onMetricClick: (calculator: string) => void;
}

const LifestyleMetrics: React.FC<LifestyleMetricsProps> = ({ 
  metrics, 
  profile, 
  onMetricClick 
}) => {
  return (
    <>
      {metrics.waterIntake && (
        <MetricCard
          title="Water"
          value={metrics.waterIntake}
          icon={Droplet}
          unit="L"
          description="Daily Water Intake"
          onClick={() => onMetricClick('water-intake')}
          tooltipText="Recommended daily water intake"
        />
      )}
      
      {metrics.dailySteps && profile.age && (
        <MetricCard
          title="Steps"
          value={metrics.dailySteps}
          icon={Footprints}
          status={getStepsStatus(metrics.dailySteps, profile.age)}
          description="Daily Steps"
          onClick={() => onMetricClick('daily-steps')}
          tooltipText="Daily step count - Measure of physical activity"
        />
      )}
      
      {metrics.sleepEfficiency && (
        <MetricCard
          title="Sleep"
          value={metrics.sleepEfficiency}
          icon={Moon}
          unit="%"
          description="Sleep Efficiency"
          onClick={() => onMetricClick('sleep-efficiency')}
          tooltipText="Sleep Efficiency - Percentage of time in bed spent sleeping"
        />
      )}
      
      {metrics.wilksScore && (
        <MetricCard
          title="Wilks"
          value={metrics.wilksScore}
          icon={Dumbbell}
          status={getWilksStatus(metrics.wilksScore)}
          description="Wilks Coefficient"
          onClick={() => onMetricClick('wilks')}
          tooltipText="Wilks Coefficient - Powerlifting strength measure"
          decimals={1}
        />
      )}
    </>
  );
};

export default LifestyleMetrics;
