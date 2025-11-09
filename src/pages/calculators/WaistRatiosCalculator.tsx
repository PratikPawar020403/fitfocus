
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { storage } from "@/utils/storage";
import { HealthStatus, showToast } from "@/lib/utils";
import { 
  calculateWHR, 
  calculateWHtR, 
  calculateABSI,
  calculateBRI,
  getWHRStatus, 
  getWHtRStatus,
  getABSIStatus,
  getBRIStatus
} from "@/utils/calculators";
import { validateMeasurement, calculateMetabolicRiskScore } from "@/utils/metricHelpers";
import WaistRatiosForm from "./waist-ratios/WaistRatiosForm";
import WaistRatiosResults from "./waist-ratios/WaistRatiosResults";

const WaistRatiosCalculator = () => {
  const [waist, setWaist] = useState<number>(0);
  const [hip, setHip] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(0);
  
  const [whr, setWHR] = useState<number>(0);
  const [whtr, setWHtR] = useState<number>(0);
  const [absi, setABSI] = useState<number>(0);
  const [bri, setBRI] = useState<number>(0);
  const [compositeRisk, setCompositeRisk] = useState<number>(0);
  const [whrStatus, setWHRStatus] = useState<HealthStatus>('neutral');
  const [whtrStatus, setWHtRStatus] = useState<HealthStatus>('neutral');
  const [absiStatus, setABSIStatus] = useState<HealthStatus>('neutral');
  const [briStatus, setBRIStatus] = useState<HealthStatus>('neutral');

  useEffect(() => {
    const profile = storage.getProfile();
    const metrics = storage.getMetrics();
    
    if (profile.waist) setWaist(profile.waist);
    if (profile.hip) setHip(profile.hip);
    if (profile.height) setHeight(profile.height);
    if (profile.weight) setWeight(profile.weight);
    if (profile.age) setAge(profile.age);
    if (profile.gender === 'male' || profile.gender === 'female') {
      setGender(profile.gender);
    }
    
    if (metrics.whr) setWHR(metrics.whr);
    if (metrics.whtr) setWHtR(metrics.whtr);
    if (metrics.absi) setABSI(metrics.absi);
    if (metrics.bri) setBRI(metrics.bri);
    
    if (metrics.whr && (profile.gender === 'male' || profile.gender === 'female')) {
      setWHRStatus(getWHRStatus(metrics.whr, profile.gender));
    }
    if (metrics.whtr) {
      setWHtRStatus(getWHtRStatus(metrics.whtr));
    }
    if (metrics.absi && (profile.gender === 'male' || profile.gender === 'female')) {
      setABSIStatus(getABSIStatus(metrics.absi, profile.gender, profile.age));
    }
    if (metrics.bri) {
      setBRIStatus(getBRIStatus(metrics.bri));
    }
  }, []);

  useEffect(() => {
    // Input validation (Fix #6)
    const validateInputs = () => {
      let isValid = true;
      
      if (waist > 0) {
        isValid = isValid && validateMeasurement(waist, 50, 200, "Waist");
      }
      
      if (hip > 0) {
        isValid = isValid && validateMeasurement(hip, 60, 200, "Hip");
      }
      
      if (height > 0) {
        isValid = isValid && validateMeasurement(height, 100, 250, "Height");
      }
      
      if (weight > 0) {
        isValid = isValid && validateMeasurement(weight, 30, 300, "Weight");
      }
      
      return isValid;
    };
    
    // Proceed only if inputs are valid
    if (!validateInputs()) {
      showToast("Please check your measurements - some values appear to be outside realistic ranges.", "warning");
      return;
    }
    
    if (waist > 0 && hip > 0) {
      try {
        const calculatedWHR = calculateWHR({ waist, hip, gender });
        setWHR(calculatedWHR);
        setWHRStatus(getWHRStatus(calculatedWHR, gender));
        
        storage.saveMetric('whr', calculatedWHR);
      } catch (error) {
        console.error("Error calculating WHR:", error);
        showToast("Error calculating Waist-to-Hip Ratio", "error");
      }
    }
    
    if (waist > 0 && height > 0) {
      try {
        const calculatedWHtR = calculateWHtR({ waist, height });
        setWHtR(calculatedWHtR);
        setWHtRStatus(getWHtRStatus(calculatedWHtR));
        
        storage.saveMetric('whtr', calculatedWHtR);
      } catch (error) {
        console.error("Error calculating WHtR:", error);
        showToast("Error calculating Waist-to-Height Ratio", "error");
      }
    }
    
    if (waist > 0 && height > 0 && weight > 0) {
      try {
        const calculatedABSI = calculateABSI({ waist, height, weight, gender, age });
        setABSI(calculatedABSI);
        setABSIStatus(getABSIStatus(calculatedABSI, gender, age));
        
        storage.saveMetric('absi', calculatedABSI);
        
        const calculatedBRI = calculateBRI({ waist, height });
        setBRI(calculatedBRI);
        setBRIStatus(getBRIStatus(calculatedBRI));
        
        storage.saveMetric('bri', calculatedBRI);
        
        // Calculate BMI for composite risk score (Fix #7)
        const heightInM = height / 100;
        const bmi = weight / (heightInM * heightInM);
        
        // Calculate composite risk score (Fix #7)
        const riskScore = calculateMetabolicRiskScore(bmi, calculatedABSI, calculatedBRI);
        setCompositeRisk(riskScore);
        storage.saveMetric('compositeRisk', riskScore);
      } catch (error) {
        console.error("Error calculating body shape indices:", error);
        showToast("Error calculating body shape indices", "error");
      }
    }
    
    storage.saveProfile({
      waist,
      hip,
      height,
      weight,
      gender,
      age
    });
  }, [waist, hip, height, weight, gender, age]);

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
                <CardTitle>Waist Ratio Calculators</CardTitle>
                <CardDescription>
                  Calculate your Waist-to-Hip Ratio (WHR), Waist-to-Height Ratio (WHtR), 
                  A Body Shape Index (ABSI), and Body Roundness Index (BRI) to assess health risks.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <WaistRatiosForm
                  waist={waist}
                  setWaist={setWaist}
                  hip={hip}
                  setHip={setHip}
                  height={height}
                  setHeight={setHeight}
                  weight={weight}
                  setWeight={setWeight}
                  gender={gender}
                  setGender={setGender}
                  age={age}
                  setAge={setAge}
                  whr={whr}
                  whtr={whtr}
                />
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Waist Ratio Results</CardTitle>
                  <CardDescription>
                    These ratios help assess your body fat distribution and potential health risks.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <WaistRatiosResults
                    whr={whr}
                    whtr={whtr}
                    absi={absi}
                    bri={bri}
                    whrStatus={whrStatus}
                    whtrStatus={whtrStatus}
                    absiStatus={absiStatus}
                    briStatus={briStatus}
                    gender={gender}
                    age={age}
                  />
                </CardContent>
              </Card>
              
              {compositeRisk > 0 && (
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-blue-600 dark:text-blue-400">Composite Risk Score</h3>
                    <p className="text-sm mt-1">
                      Your composite metabolic risk score is {compositeRisk.toFixed(2)}. This combines BMI, ABSI, and BRI to provide a more comprehensive health risk assessment.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Formula: 0.3 × (BMI/30) + 0.4 × (ABSI/0.08) + 0.3 × (BRI/7)
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaistRatiosCalculator;
