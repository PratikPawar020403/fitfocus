
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MetricField from "@/components/ui-custom/MetricField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Calculator, Circle } from "lucide-react";
import {
  calculateBMI,
  getBMIStatus,
  getBMIDescription,
} from "@/utils/calculators";
import { storage } from "@/utils/storage";
import { cn, getStatusColor, getProgressBgColor, getProgressFillColor } from "@/lib/utils";
import { toast } from "sonner";

const BMICalculator = () => {
  // State for input values
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  
  // State for results
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmiStatus, setBmiStatus] = useState<"optimal" | "warning" | "risk" | "neutral">("neutral");
  
  // Load saved values on initial render
  useEffect(() => {
    const profile = storage.getProfile();
    if (profile.weight) setWeight(profile.weight);
    if (profile.height) setHeight(profile.height);
    
    // Calculate BMI on initial load if values exist
    if (profile.weight && profile.height) {
      calculateBmiValue(profile.weight, profile.height);
    }
  }, []);
  
  // Calculate BMI
  const calculateBmiValue = (weightValue: number, heightValue: number) => {
    const calculatedBmi = calculateBMI({ weight: weightValue, height: heightValue });
    setBmi(calculatedBmi);
    setBmiCategory(getBMIDescription(calculatedBmi));
    setBmiStatus(getBMIStatus(calculatedBmi));
    
    // Save results
    storage.saveMetric("bmi", calculatedBmi);
    
    // Also save the profile values used for calculation
    storage.saveProfile({
      weight: weightValue,
      height: heightValue,
    });
    
    // Show toast
    toast.success("BMI calculated and saved!", {
      position: "top-center",
      duration: 2000,
    });
  };
  
  // Handle calculate button click
  const handleCalculate = () => {
    calculateBmiValue(weight, height);
  };
  
  // Get status-based styles
  const statusColor = bmiStatus ? getStatusColor(bmiStatus) : "";
  const progressBgColor = bmiStatus ? getProgressBgColor(bmiStatus) : "";
  const progressFillColor = bmiStatus ? getProgressFillColor(bmiStatus) : "";
  
  // Calculate progress percentage for the progress bar (0-100)
  const getProgressPercentage = () => {
    if (bmi === null) return 0;
    
    // Show progress relative to a healthy BMI range (up to max of 35)
    // This makes the progress bar more visually useful
    return Math.min(100, (bmi / 35) * 100);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <NavLink to="/calculators" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calculators
              </NavLink>
            </Button>
          </div>
          
          <div className="calculator-container">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">BMI Calculator</h1>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium mb-4">Your Measurements</h2>
                
                <MetricField
                  label="Weight"
                  value={weight}
                  onChange={setWeight}
                  min={30}
                  max={250}
                  step={0.5}
                  unit="kg"
                />
                
                <MetricField
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  min={100}
                  max={250}
                  unit="cm"
                />
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleCalculate}
                >
                  Calculate BMI
                </Button>
              </div>
              
              {/* Results Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium mb-4">Your Results</h2>
                
                <div className="text-center p-6 bg-secondary/50 rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Your BMI
                  </h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className={cn("text-4xl font-bold", statusColor)}>
                      {bmi !== null ? bmi.toFixed(1) : "--"}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      kg/m²
                    </span>
                  </div>
                  
                  <p className={cn("text-sm font-medium", statusColor)}>
                    {bmiCategory || "Calculate to see your category"}
                  </p>
                  
                  {/* Progress bar */}
                  {bmi !== null && (
                    <div className="mt-4">
                      <div className={cn("h-2 rounded-full w-full overflow-hidden", progressBgColor)}>
                        <div 
                          className={cn("h-full rounded-full transition-all duration-500", progressFillColor)} 
                          style={{ width: `${getProgressPercentage()}%` }}
                        />
                      </div>
                      
                      {/* BMI Range Markers */}
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                      </div>
                      
                      {/* BMI Range Values */}
                      <div className="flex justify-between text-xs mt-1 px-1">
                        <span>&lt;18.5</span>
                        <span>18.5-24.9</span>
                        <span>25-29.9</span>
                        <span>&gt;30</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Interpretation */}
                {bmi !== null && (
                  <Card className={cn("border-l-4", {
                    "border-l-health-optimal": bmiStatus === "optimal",
                    "border-l-health-warning": bmiStatus === "warning",
                    "border-l-health-risk": bmiStatus === "risk"
                  })}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className={cn("p-1.5 rounded-full mr-3 mt-0.5", `bg-${bmiStatus}/10`)}>
                          <Circle className={cn("h-3 w-3", statusColor)} fill="currentColor" />
                        </div>
                        <div>
                          <h3 className={cn("font-medium", statusColor)}>
                            {bmiStatus === "optimal" ? "Healthy Weight" : 
                             bmiStatus === "warning" ? "Attention Needed" : "Health Risk"}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {bmiStatus === "optimal" 
                              ? "Your BMI indicates you are at a healthy weight. Maintain your current habits while focusing on nutritious foods and regular activity."
                              : bmiStatus === "warning" && bmi < 18.5
                                ? "Your BMI indicates you are underweight. Consider discussing with a healthcare provider about healthy ways to gain weight."
                                : bmiStatus === "warning" && bmi >= 25
                                  ? "Your BMI indicates you are overweight. Small lifestyle changes like increased activity and balanced nutrition can help."
                                  : "Your BMI indicates obesity, which increases risk for several health conditions. Consider consulting a healthcare provider for personalized advice."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Information About BMI */}
            <div className="mt-10 p-6 bg-secondary/30 rounded-xl">
              <h3 className="font-medium mb-2">About BMI Limitations</h3>
              <p className="text-sm text-muted-foreground">
                While BMI is useful for getting a general indication of healthy weight ranges, it has limitations. It doesn't account for factors like muscle mass, bone density, or body composition. Athletes may have a high BMI due to muscle mass rather than body fat. BMI also doesn't differentiate where fat is stored, which can be important for health risks.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BMICalculator;
