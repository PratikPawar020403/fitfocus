
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserMetrics } from "@/utils/storage";
import { hasValidMetrics } from "@/utils/metricHelpers";
import SummaryContent from "./summary/SummaryContent";

interface HealthSummaryProps {
  metrics: UserMetrics;
  profile: { gender?: 'male' | 'female' };
}

const HealthSummary = ({ metrics, profile }: HealthSummaryProps) => {
  // Check if there are any metrics to display
  const hasMetrics = hasValidMetrics(metrics);

  return (
    <Card className="glass-card col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Health Summary</CardTitle>
        <CardDescription>
          Analysis based on your health metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SummaryContent hasMetrics={hasMetrics} metrics={metrics} profile={profile} />
      </CardContent>
    </Card>
  );
};

export default HealthSummary;
