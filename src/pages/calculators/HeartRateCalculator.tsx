
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { storage } from "@/utils/storage";
import HeartRateForm from "./heart-rate/HeartRateForm";
import HeartRateResults from "./heart-rate/HeartRateResults";
import { calculateMHR, calculateTargetHeartRate, getRHRStatus } from "@/utils/calculators/fitness";
import { HealthStatus } from "@/lib/utils";
import { toast } from "sonner";

const HeartRateCalculator = () => {
  const [age, setAge] = useState<number>(30);
  const [restingHR, setRestingHR] = useState<number>(70);
  const [mhr, setMHR] = useState<number>(0);
  const [targetHR, setTargetHR] = useState<{ lower: number; upper: number }>({ lower: 0, upper: 0 });
  const [rhrStatus, setRHRStatus] = useState<HealthStatus>('neutral');
  const [intensityLevel, setIntensityLevel] = useState<'moderate' | 'vigorous'>('moderate');

  useEffect(() => {
    const profile = storage.getProfile();
    const metrics = storage.getMetrics();
    
    if (profile.age) setAge(profile.age);
    if (profile.restingHR) setRestingHR(profile.restingHR);
    
    if (metrics.mhr) setMHR(metrics.mhr);
    if (metrics.targetHeartRate) setTargetHR(metrics.targetHeartRate);
    if (metrics.restingHeartRate) {
      setRestingHR(metrics.restingHeartRate);
      setRHRStatus(getRHRStatus(metrics.restingHeartRate));
    }
  }, []);

  useEffect(() => {
    if (age > 0) {
      try {
        // Calculate Maximum Heart Rate
        const calculatedMHR = calculateMHR(age);
        setMHR(calculatedMHR);
        storage.saveMetric('mhr', calculatedMHR);
        
        // Calculate Target Heart Rate Zone based on intensity level
        const calculatedTargetHR = calculateTargetHeartRate(age, intensityLevel);
        setTargetHR(calculatedTargetHR);
        storage.saveMetric('targetHeartRate', calculatedTargetHR);
        
        // Save age to profile
        storage.saveProfile({ age });
      } catch (error) {
        console.error('Error calculating heart rates:', error);
        toast.error('Error calculating heart rates. Please check your inputs.');
      }
    }
  }, [age, intensityLevel]);

  useEffect(() => {
    if (restingHR > 0) {
      setRHRStatus(getRHRStatus(restingHR));
      storage.saveMetric('restingHeartRate', restingHR);
      storage.saveProfile({ restingHR });
    }
  }, [restingHR]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Link to="/calculators" className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Link>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Calculator</CardTitle>
                <CardDescription>
                  Calculate your Resting Heart Rate (RHR), Maximum Heart Rate (MHR), and Target Heart Rate (THR) for optimal exercise intensity.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <HeartRateForm
                  age={age}
                  setAge={setAge}
                  restingHR={restingHR}
                  setRestingHR={setRestingHR}
                  intensityLevel={intensityLevel}
                  setIntensityLevel={setIntensityLevel}
                />
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Heart Rate Results</CardTitle>
                  <CardDescription>
                    These metrics help assess your cardiovascular health and determine optimal exercise intensity.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <HeartRateResults
                    restingHR={restingHR}
                    mhr={mhr}
                    targetHR={targetHR}
                    rhrStatus={rhrStatus}
                    intensityLevel={intensityLevel}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HeartRateCalculator;
