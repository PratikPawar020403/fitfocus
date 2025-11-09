
import React from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Activity } from "lucide-react";

const EmptyDashboard = () => {
  return (
    <div className="text-center py-16">
      <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Activity className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Your dashboard is empty</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Start tracking your health by using our calculators to measure different metrics.
      </p>
      <Button asChild size="lg" className="mb-4">
        <NavLink to="/calculators">Go to Calculators</NavLink>
      </Button>
      <p className="text-sm text-muted-foreground mt-8">
        Your metrics will appear here once you use the calculators.
      </p>
    </div>
  );
};

export default EmptyDashboard;
