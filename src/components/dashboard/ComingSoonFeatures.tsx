
import React from "react";
import { User, Heart, Apple } from "lucide-react";

const ComingSoonFeatures = () => {
  return (
    <section className="mt-12 glass-panel p-8 rounded-xl text-center">
      <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
      <p className="text-muted-foreground mb-6">
        We're working on exciting new features to enhance your health tracking experience.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4">
          <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium">Health Profiles</h3>
          <p className="text-sm text-muted-foreground">Multiple profiles for family members</p>
        </div>
        <div className="p-4">
          <Heart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium">Progress Tracking</h3>
          <p className="text-sm text-muted-foreground">Historical data and trend analysis</p>
        </div>
        <div className="p-4">
          <Apple className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium">Nutrition Log</h3>
          <p className="text-sm text-muted-foreground">Track daily food intake and nutrients</p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonFeatures;
