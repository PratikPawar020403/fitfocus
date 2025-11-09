
import React from "react";
import { Card } from "@/components/ui/card";

const SleepEfficiencyInfoSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-secondary/30 rounded-xl">
        <h3 className="font-medium mb-2">About Sleep Efficiency</h3>
        <p className="text-sm text-muted-foreground">
          Sleep efficiency measures the percentage of time you spend actually sleeping while in bed. It's a valuable 
          metric for assessing sleep quality and can help identify issues like insomnia or other sleep disturbances.
          A higher sleep efficiency indicates better sleep quality.
        </p>
      </div>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Sleep Efficiency Formula</h3>
        <div className="text-sm space-y-4">
          <div className="p-4 bg-muted rounded-md font-mono text-center">
            Sleep Efficiency (%) = (Total Sleep Time ÷ Total Time in Bed) × 100
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Example Calculation:</p>
            <p>If you spend 8 hours (480 minutes) in bed but sleep for 6.5 hours (390 minutes):</p>
            <p>Sleep Efficiency = (390 ÷ 480) × 100 = 81.25%</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Sleep Efficiency Interpretation</h3>
        <div className="text-sm space-y-3">
          <ul className="space-y-3">
            <li className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              <span className="font-medium text-green-600">≥ 85%:</span> Good sleep efficiency, indicative of high-quality sleep
            </li>
            <li className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <span className="font-medium text-yellow-600">75-84%:</span> Fair sleep efficiency, some room for improvement
            </li>
            <li className="p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
              <span className="font-medium text-red-600">&lt; 75%:</span> Poor sleep efficiency, may indicate sleep problems
            </li>
          </ul>
          
          <p className="mt-4">
            Sleep specialists often consider sleep efficiency of 85% or higher as indicative of healthy sleep. 
            Lower percentages may suggest underlying sleep issues that could benefit from further evaluation.
          </p>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Tips to Improve Sleep Efficiency</h3>
        <div className="text-sm space-y-2">
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Maintain a consistent sleep schedule, even on weekends</li>
            <li>Create a relaxing bedtime routine</li>
            <li>Avoid using electronic devices for 1-2 hours before bedtime</li>
            <li>Ensure your bedroom is dark, quiet, and at a comfortable temperature</li>
            <li>Avoid caffeine, large meals, and alcohol close to bedtime</li>
            <li>Only use your bed for sleep and intimacy, not for work or watching TV</li>
            <li>If you can't sleep after 20 minutes, get up and do something relaxing until you feel sleepy</li>
            <li>Exercise regularly, but not too close to bedtime</li>
          </ul>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-medium mb-2">Limitations</h3>
        <p className="text-sm text-muted-foreground">
          Self-reported sleep time may be inaccurate as most people are unaware of brief awakenings during the night. 
          For more precise measurements, sleep studies or wearable sleep trackers can provide more detailed data. 
          Additionally, sleep quality involves more factors than just efficiency, including sleep stages and 
          continuity.
        </p>
      </Card>
    </div>
  );
};

export default SleepEfficiencyInfoSection;
