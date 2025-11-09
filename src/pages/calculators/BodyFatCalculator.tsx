
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { storage } from "@/utils/storage";
import BodyFatForm from "./body-fat/BodyFatForm";
import BodyFatResults from "./body-fat/BodyFatResults";

const BodyFatCalculator = () => {
  const [activeTab, setActiveTab] = useState("navy");
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [rfm, setRfm] = useState<number | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  useEffect(() => {
    const profile = storage.getProfile();
    if (profile.gender && (profile.gender === 'male' || profile.gender === 'female')) {
      setGender(profile.gender);
    }
  }, []);

  const handleCalculate = (calculatedBodyFat: number, calculatedRFM: number) => {
    setBodyFat(calculatedBodyFat);
    setRfm(calculatedRFM);
    
    // Save results
    storage.saveMetric("bodyFatPercentage", calculatedBodyFat);
    storage.saveMetric("rfm", calculatedRFM);
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
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Body Fat Calculator</h1>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Calculate your body fat percentage using the U.S. Navy Method and Relative Fat Mass (RFM) formula. Both methods provide an estimate of your body fat percentage based on your measurements.
            </p>
            
            <Tabs defaultValue="navy" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="navy">Navy Method</TabsTrigger>
                <TabsTrigger value="rfm">Relative Fat Mass (RFM)</TabsTrigger>
              </TabsList>
              <TabsContent value="navy" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  The U.S. Navy Method uses circumference measurements to estimate body fat percentage. It's widely used as it doesn't require specialized equipment.
                </p>
              </TabsContent>
              <TabsContent value="rfm" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  The Relative Fat Mass (RFM) is a newer method that uses height and waist circumference to estimate body fat. It's simpler than the Navy Method but still provides accurate estimates.
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BodyFatForm onCalculate={handleCalculate} />
              <BodyFatResults bodyFat={bodyFat} rfm={rfm} gender={gender} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BodyFatCalculator;
