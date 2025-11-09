
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const WilksInfoSection = () => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">What is the Wilks Coefficient?</h3>
          <p className="text-muted-foreground text-sm">
            The Wilks Coefficient is a formula used in powerlifting to compare the strength of lifters 
            across different weight classes and genders. It was developed by Robert Wilks for the International 
            Powerlifting Federation (IPF).
          </p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-xl font-semibold mb-2">How is it calculated?</h3>
          <p className="text-muted-foreground text-sm mb-2">
            The Wilks formula calculates a coefficient based on the lifter's body weight and then 
            multiplies it by the weight lifted:
          </p>
          
          <div className="bg-muted p-4 rounded-md mb-4">
            <p className="font-mono text-sm">
              Coefficient = 500 / (a + b·W + c·W² + d·W³ + e·W⁴ + f·W⁵)
            </p>
            <p className="font-mono text-sm mt-2">
              Wilks Score = Coefficient × Weight Lifted
            </p>
          </div>
          
          <p className="text-muted-foreground text-sm mb-2">
            Where <span className="font-semibold">W</span> is the lifter's body weight (in kilograms), and 
            the constants <span className="font-semibold">a</span>, <span className="font-semibold">b</span>, 
            <span className="font-semibold">c</span>, <span className="font-semibold">d</span>, 
            <span className="font-semibold">e</span>, and <span className="font-semibold">f</span> vary by gender:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">For Men:</h4>
              <ul className="text-xs space-y-1 font-mono">
                <li>a = -216.0475144</li>
                <li>b = 16.2606339</li>
                <li>c = -0.002388645</li>
                <li>d = -0.00113732</li>
                <li>e = 7.01863×10⁻⁶</li>
                <li>f = -1.291×10⁻⁸</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-md">
              <h4 className="font-semibold mb-2 text-pink-700 dark:text-pink-300">For Women:</h4>
              <ul className="text-xs space-y-1 font-mono">
                <li>a = 594.31747775582</li>
                <li>b = -27.23842536447</li>
                <li>c = 0.82112226871</li>
                <li>d = -0.00930733913</li>
                <li>e = 4.731582×10⁻⁵</li>
                <li>f = -9.054×10⁻⁸</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Individual vs. Total Lift</h3>
          <p className="text-muted-foreground text-sm mb-2">
            The Wilks formula can be applied to both individual lifts and total lifts:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong>Individual Lift:</strong> Calculate the Wilks score for a single lift like bench press, squat, or deadlift.</li>
            <li><strong>Total Lift:</strong> Calculate the Wilks score for the sum of the best squat, bench press, and deadlift attempts.</li>
          </ul>
          <p className="text-muted-foreground text-sm mt-2">
            The same formula applies to both - only the weight value changes.
          </p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Interpreting Your Wilks Score</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-24 font-medium text-sm">200-300:</div>
              <div className="text-sm text-muted-foreground">Novice lifter</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-medium text-sm">300-400:</div>
              <div className="text-sm text-muted-foreground">Intermediate lifter</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-medium text-sm">400-450:</div>
              <div className="text-sm text-muted-foreground">Advanced lifter</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-medium text-sm">450-500:</div>
              <div className="text-sm text-muted-foreground">Elite lifter</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-medium text-sm">500+:</div>
              <div className="text-sm text-muted-foreground">World class lifter</div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Why Use Wilks?</h3>
          <p className="text-muted-foreground text-sm">
            The Wilks Coefficient allows fair comparisons between lifters of different body weights. 
            Without this normalization, heavier lifters would generally have an advantage in absolute 
            strength. The Wilks formula levels the playing field for competitive purposes.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Our implementation matches the one used on <a href="https://strengthlevel.com/wilks-calculator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Strength Level's Wilks Calculator</a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WilksInfoSection;
