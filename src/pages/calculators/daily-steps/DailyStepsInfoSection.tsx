
import React from "react";
import { Card } from "@/components/ui/card";

const DailyStepsInfoSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-secondary/30 rounded-xl">
        <h3 className="font-medium mb-2">About Daily Steps Tracking</h3>
        <p className="text-sm text-muted-foreground">
          Daily step count is a simple but effective measure of physical activity. Steps can be tracked using 
          pedometers, smartphones, fitness trackers, or smartwatches. This metric provides an accessible way 
          to monitor and increase daily movement, which is essential for maintaining good health.
        </p>
      </div>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Step Count Recommendations</h3>
        <div className="text-sm space-y-4">
          <div>
            <p className="font-medium">For Adults Under 60:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><span className="font-medium text-green-600">8,000-10,000+ steps/day:</span> Optimal for health benefits</li>
              <li><span className="font-medium text-yellow-600">5,000-7,999 steps/day:</span> Moderate activity level</li>
              <li><span className="font-medium text-red-600">Below 5,000 steps/day:</span> Sedentary lifestyle</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium">For Adults 60 and Older:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><span className="font-medium text-green-600">6,000-8,000+ steps/day:</span> Optimal for health benefits</li>
              <li><span className="font-medium text-yellow-600">3,000-5,999 steps/day:</span> Moderate activity level</li>
              <li><span className="font-medium text-red-600">Below 3,000 steps/day:</span> Low activity level</li>
            </ul>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Health Benefits of Increased Steps</h3>
        <div className="text-sm space-y-2">
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Reduced risk of heart disease, stroke, and type 2 diabetes</li>
            <li>Improved cardiovascular fitness and endurance</li>
            <li>Better weight management and reduced body fat</li>
            <li>Enhanced mood and reduced symptoms of depression</li>
            <li>Improved sleep quality</li>
            <li>Stronger bones and muscles</li>
            <li>Reduced risk of all-cause mortality</li>
          </ul>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Tips to Increase Daily Steps</h3>
        <div className="text-sm space-y-2">
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Take the stairs instead of elevators or escalators</li>
            <li>Park farther away from entrances</li>
            <li>Walk during lunch breaks</li>
            <li>Schedule walking meetings</li>
            <li>Set hourly reminders to walk for a few minutes</li>
            <li>Walk or pace while talking on the phone</li>
            <li>Get off public transit one stop early and walk the rest</li>
            <li>Take the long route when walking to destinations</li>
          </ul>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-2">Limitations</h3>
        <p className="text-sm text-muted-foreground">
          While step counting is valuable, it doesn't account for exercise intensity, strength training, 
          swimming, cycling, or other non-stepping activities. It's best used as one component of a 
          comprehensive physical activity assessment.
        </p>
      </Card>
    </div>
  );
};

export default DailyStepsInfoSection;
