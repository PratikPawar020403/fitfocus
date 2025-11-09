
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-32 bg-muted rounded-xl"></div>
      ))}
    </div>
  );
};

export default DashboardLoading;
