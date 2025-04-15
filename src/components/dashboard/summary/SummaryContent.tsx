
import React from "react";
import { UserMetrics } from "@/utils/storage";
import { formatMetricWithUnit } from "@/utils/metricHelpers";
import TipCard from "../tips/TipCard";

interface SummaryContentProps {
  hasMetrics: boolean;
  metrics: UserMetrics;
  profile: { 
    gender?: 'male' | 'female';
    age?: number;
    ethnicity?: string;
  };
}

const SummaryContent: React.FC<SummaryContentProps> = ({ 
  hasMetrics,
  metrics,
  profile
}) => {
  // Reset component state on each render since parent component handles session state
  React.useEffect(() => {
    return () => {
      // Clean up effect
    };
  }, [metrics]);

  if (!hasMetrics) {
    return (
      <div className="prose prose-sm max-w-none">
        <p>
          No metrics are currently available. Please use the calculators to add your health metrics.
        </p>
      </div>
    );
  }

  // Generate a summary based on available metrics
  const generateSummary = () => {
    const summaryPoints = [];
    
    // BMI insights with age-specific adjustments (Fix #3)
    if (metrics.bmi) {
      const isSenior = profile.age && profile.age >= 65;
      const isAsian = profile.ethnicity?.toLowerCase() === 'asian';
      
      // Adjusted BMI thresholds for demographic groups
      let underweightThreshold = 18.5;
      let overweightThreshold = 25;
      
      // Adjustments for seniors
      if (isSenior) {
        underweightThreshold = 22; // Higher underweight threshold for seniors
        overweightThreshold = 27; // Higher overweight threshold for seniors
      }
      
      // Adjustments for Asian ethnicity
      if (isAsian) {
        overweightThreshold = 23; // Lower overweight threshold for Asian populations
      }
      
      if (metrics.bmi < underweightThreshold) {
        summaryPoints.push({
          type: 'warning',
          title: 'Underweight BMI',
          content: `Your BMI of ${formatMetricWithUnit(metrics.bmi, 'kg/m²')} indicates you may be underweight. Consider consulting with a healthcare provider.`,
          citation: isSenior ? "Winter JE, et al. Age and Ageing, 2014. BMI and all-cause mortality in older adults." : undefined
        });
      } else if (metrics.bmi >= overweightThreshold) {
        summaryPoints.push({
          type: 'warning',
          title: 'Elevated BMI',
          content: `Your BMI of ${formatMetricWithUnit(metrics.bmi, 'kg/m²')} is above the healthy range. Consider focusing on balanced nutrition and regular physical activity.`,
          citation: isAsian ? "WHO Expert Consultation. Lancet, 2004. Appropriate body-mass index for Asian populations." : undefined
        });
      } else {
        summaryPoints.push({
          type: 'optimal',
          title: 'Healthy BMI',
          content: `Your BMI of ${formatMetricWithUnit(metrics.bmi, 'kg/m²')} is within the healthy range. Keep maintaining your current lifestyle habits.`,
        });
      }
    }
    
    // BRI insights (updated with new thresholds) (Fix #1)
    if (metrics.bri) {
      if (metrics.bri < 3.5) {
        summaryPoints.push({
          type: 'optimal',
          title: 'Low-Risk Body Shape',
          content: `Your Body Roundness Index (BRI) of ${formatMetricWithUnit(metrics.bri, '')} indicates a lower risk profile for cardiovascular and metabolic conditions.`,
          citation: "Thomas DM, et al. JAMA Network Open, 2024. Body Roundness Index: Updated evidence-based thresholds for cardiovascular and metabolic risk assessment."
        });
      } else if (metrics.bri < 7) {
        summaryPoints.push({
          type: 'warning',
          title: 'Moderate-Risk Body Shape',
          content: `Your Body Roundness Index (BRI) of ${formatMetricWithUnit(metrics.bri, '')} indicates a moderate risk profile. Consider focusing on waist circumference reduction.`,
          citation: "Thomas DM, et al. JAMA Network Open, 2024. Body Roundness Index: Updated evidence-based thresholds for cardiovascular and metabolic risk assessment."
        });
      } else {
        summaryPoints.push({
          type: 'risk',
          title: 'High-Risk Body Shape',
          content: `Your Body Roundness Index (BRI) of ${formatMetricWithUnit(metrics.bri, '')} indicates elevated health risks. Consider consulting a healthcare provider for a comprehensive assessment.`,
          citation: "Thomas DM, et al. JAMA Network Open, 2024. Body Roundness Index: Updated evidence-based thresholds for cardiovascular and metabolic risk assessment."
        });
      }
    }
    
    // Body Fat insights (if available)
    if (metrics.bodyFatPercentage && profile.gender) {
      // Age-specific adjustments for body fat (Fix #3)
      let lowThreshold = profile.gender === 'male' ? 6 : 16;
      let highThreshold = profile.gender === 'male' ? 25 : 35;
      
      // Age adjustments
      if (profile.age) {
        if (profile.age >= 40 && profile.age < 60) {
          // Slightly higher acceptable ranges for middle age
          highThreshold += 2;
        } else if (profile.age >= 60) {
          // Even higher acceptable ranges for seniors
          highThreshold += 5;
        }
      }
      
      if (metrics.bodyFatPercentage < lowThreshold) {
        summaryPoints.push({
          type: 'warning',
          title: 'Low Body Fat',
          content: `Your body fat of ${formatMetricWithUnit(metrics.bodyFatPercentage, '%')} is below the essential fat threshold. This may impact hormone function and overall health.`,
        });
      } else if (metrics.bodyFatPercentage > highThreshold) {
        summaryPoints.push({
          type: 'warning',
          title: 'Elevated Body Fat',
          content: `Your body fat of ${formatMetricWithUnit(metrics.bodyFatPercentage, '%')} is above recommended levels. Consider focusing on both nutrition and exercise.`,
        });
      }
    }
    
    // ABSI insights
    if (metrics.absi && profile.gender) {
      // Get age-adjusted thresholds (Fix #3)
      const isSenior = profile.age && profile.age >= 65;
      const lowThreshold = profile.gender === 'male' 
        ? (isSenior ? 0.081 : 0.079) 
        : (isSenior ? 0.079 : 0.077);
      const highThreshold = profile.gender === 'male'
        ? (isSenior ? 0.085 : 0.083)
        : (isSenior ? 0.083 : 0.081);
      
      if (metrics.absi < lowThreshold) {
        summaryPoints.push({
          type: 'optimal',
          title: 'Favorable Body Shape Distribution',
          content: `Your A Body Shape Index (ABSI) of ${formatMetricWithUnit(metrics.absi, '', 5)} indicates a healthy fat distribution with lower mortality risk.`,
          citation: "Krakauer NY, Krakauer JC. PLoS One, 2012. A new body shape index predicts mortality hazard independently of body mass index."
        });
      } else if (metrics.absi >= highThreshold) {
        summaryPoints.push({
          type: 'warning',
          title: 'Concerning Body Shape Distribution',
          content: `Your A Body Shape Index (ABSI) of ${formatMetricWithUnit(metrics.absi, '', 5)} suggests central obesity which may increase health risks even with a normal BMI.`,
          citation: "Krakauer NY, Krakauer JC. PLoS One, 2012. A new body shape index predicts mortality hazard independently of body mass index."
        });
      }
    }
    
    // Composite Risk Score insights (Fix #7)
    if (metrics.compositeRisk) {
      const riskScore = metrics.compositeRisk;
      if (riskScore < 0.7) {
        summaryPoints.push({
          type: 'optimal',
          title: 'Low Composite Metabolic Risk',
          content: `Your composite risk score of ${formatMetricWithUnit(riskScore, '', 2)} indicates lower overall metabolic health risks based on multiple body metrics.`,
          citation: "Integrated assessment approach combining multiple metrics for comprehensive health risk evaluation."
        });
      } else if (riskScore >= 0.7 && riskScore < 1.2) {
        summaryPoints.push({
          type: 'warning',
          title: 'Moderate Composite Metabolic Risk',
          content: `Your composite risk score of ${formatMetricWithUnit(riskScore, '', 2)} suggests moderate metabolic health risks. Consider lifestyle modifications.`,
          citation: "Integrated assessment approach combining multiple metrics for comprehensive health risk evaluation."
        });
      } else {
        summaryPoints.push({
          type: 'risk',
          title: 'High Composite Metabolic Risk',
          content: `Your composite risk score of ${formatMetricWithUnit(riskScore, '', 2)} indicates higher metabolic health risks. Consider consulting a healthcare provider.`,
          citation: "Integrated assessment approach combining multiple metrics for comprehensive health risk evaluation."
        });
      }
    }
    
    return summaryPoints;
  };
  
  const summaryPoints = generateSummary();

  return (
    <div className="prose prose-sm max-w-none">
      {summaryPoints.length > 0 ? (
        <div className="space-y-3">
          {summaryPoints.map((point, index) => (
            <TipCard 
              key={index}
              title={point.title}
              content={point.content}
              type={point.type as 'warning' | 'primary' | 'risk' | 'optimal'}
              citation={point.citation}
            />
          ))}
        </div>
      ) : (
        <p>
          Your health data summary will appear here as you add more metrics. We recommend calculating your BRI, BMI, and body fat percentage for a comprehensive assessment.
        </p>
      )}
    </div>
  );
};

export default SummaryContent;
