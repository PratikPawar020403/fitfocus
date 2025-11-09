
import React from "react";
import MetricCard from "../../ui-custom/MetricCard";
import { Scale, Ruler, Activity } from "lucide-react";
import { UserMetrics } from "@/utils/storage";
import { 
  getBMIStatus, 
  getBodyFatStatus, 
  getWHRStatus, 
  getWHtRStatus,
  getABSIStatus,
  getBRIStatus
} from "@/utils/calculators";

interface BodyCompositionMetricsProps {
  metrics: UserMetrics;
  profile: { gender?: 'male' | 'female' };
  onMetricClick: (calculator: string) => void;
}

const BodyCompositionMetrics: React.FC<BodyCompositionMetricsProps> = ({ 
  metrics, 
  profile, 
  onMetricClick 
}) => {
  return (
    <>
      {metrics.bmi && (
        <MetricCard
          title="BMI"
          value={metrics.bmi}
          icon={Scale}
          unit="kg/m²"
          status={getBMIStatus(metrics.bmi)}
          description="Body Mass Index"
          onClick={() => onMetricClick('bmi')}
          tooltipText="Body Mass Index - Weight relative to height"
        />
      )}
      
      {metrics.bodyFatPercentage && profile.gender && (
        <MetricCard
          title="Body Fat"
          value={metrics.bodyFatPercentage}
          icon={Activity}
          unit="%"
          status={getBodyFatStatus(metrics.bodyFatPercentage, profile.gender)}
          description="Body Fat Percentage"
          onClick={() => onMetricClick('body-fat')}
          tooltipText="Body Fat Percentage - U.S. Navy Method"
        />
      )}
      
      {metrics.rfm && (
        <MetricCard
          title="RFM"
          value={metrics.rfm}
          icon={Activity}
          unit="%"
          description="Relative Fat Mass"
          status={profile.gender ? getBodyFatStatus(metrics.rfm, profile.gender) : "neutral"}
          onClick={() => onMetricClick('body-fat')}
          tooltipText="Relative Fat Mass - Based on height and waist"
        />
      )}
      
      {metrics.whr && profile.gender && (
        <MetricCard
          title="WHR"
          value={metrics.whr}
          icon={Ruler}
          status={getWHRStatus(metrics.whr, profile.gender)}
          description="Waist-to-Hip Ratio"
          onClick={() => onMetricClick('waist-ratios')}
          tooltipText="Waist-to-Hip Ratio - Fat distribution indicator"
        />
      )}
      
      {metrics.whtr && (
        <MetricCard
          title="WHtR"
          value={metrics.whtr}
          icon={Ruler}
          status={getWHtRStatus(metrics.whtr)}
          description="Waist-to-Height Ratio"
          onClick={() => onMetricClick('waist-ratios')}
          tooltipText="Waist-to-Height Ratio - Central adiposity indicator"
        />
      )}
      
      {metrics.absi && (
        <MetricCard
          title="ABSI"
          value={metrics.absi}
          icon={Ruler}
          status={profile.gender ? getABSIStatus(metrics.absi, profile.gender) : "neutral"}
          description="A Body Shape Index"
          onClick={() => onMetricClick('waist-ratios')}
          tooltipText="A Body Shape Index - Abdominal fat risk indicator"
          decimals={3}
        />
      )}
      
      {metrics.bri && (
        <MetricCard
          title="BRI"
          value={metrics.bri}
          icon={Ruler}
          status={getBRIStatus(metrics.bri)}
          description="Body Roundness Index"
          onClick={() => onMetricClick('waist-ratios')}
          tooltipText="Body Roundness Index - Body shape estimate"
          decimals={1}
        />
      )}
    </>
  );
};

export default BodyCompositionMetrics;
