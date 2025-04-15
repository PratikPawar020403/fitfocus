
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserMetrics } from "@/utils/storage";
import TipCard from "./tips/TipCard";
import { useTips } from "@/hooks/useTips";

interface HealthTipsProps {
  metrics: UserMetrics;
}

const HealthTips = ({ metrics }: HealthTipsProps) => {
  // Get the relevant tips based on user metrics
  const relevantTips = useTips(metrics);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Health Tips</CardTitle>
        <CardDescription>
          Personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {relevantTips.length > 0 ? (
          relevantTips.map(tip => (
            <TipCard 
              key={tip.id}
              title={tip.title}
              content={tip.content}
              type={tip.type}
            />
          ))
        ) : (
          <TipCard
            title="Add More Metrics"
            content="Complete more health calculations to receive personalized tips and recommendations."
            type="primary"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default HealthTips;
