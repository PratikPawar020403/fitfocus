
import React from "react";
import MetricCard from "../../ui-custom/MetricCard";
import { Flame } from "lucide-react";
import { UserMetrics } from "@/utils/storage";

interface MetabolicMetricsProps {
  metrics: UserMetrics;
  onMetricClick: (calculator: string) => void;
}

const MetabolicMetrics: React.FC<MetabolicMetricsProps> = ({ 
  metrics, 
  onMetricClick 
}) => {
  return (
    <>
      {metrics.bmr && (
        <MetricCard
          title="BMR"
          value={metrics.bmr}
          icon={Flame}
          unit="kcal"
          description="Basal Metabolic Rate"
          onClick={() => onMetricClick('bmr')}
          tooltipText="Basal Metabolic Rate - Calories burned at rest"
        />
      )}
      
      {metrics.tdee && (
        <MetricCard
          title="TDEE"
          value={metrics.tdee}
          icon={Flame}
          unit="kcal"
          description="Total Daily Energy"
          onClick={() => onMetricClick('tdee')}
          tooltipText="Total Daily Energy Expenditure - Total calories burned daily"
        />
      )}
    </>
  );
};

export default MetabolicMetrics;
