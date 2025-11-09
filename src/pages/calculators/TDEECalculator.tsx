
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Flame } from "lucide-react";
import { calculateBMR, calculateTDEE } from "@/utils/calculators";
import { storage } from "@/utils/storage";
import { toast } from "sonner";
import TDEEInputForm from "./tdee/TDEEInputForm";
import TDEEResults from "./tdee/TDEEResults";
import TDEEInfoSection from "./tdee/TDEEInfoSection";

const TDEECalculator = () => {
  // State for input values
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "very-active" | "extra-active">("moderate");
  
  // State for results
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);
  
  // Load saved values on initial render
  useEffect(() => {
    const profile = storage.getProfile();
    if (profile.weight) setWeight(profile.weight);
    if (profile.height) setHeight(profile.height);
    if (profile.age) setAge(profile.age);
    if (profile.gender && (profile.gender === "male" || profile.gender === "female")) {
      setGender(profile.gender);
    }
    if (profile.activityLevel) setActivityLevel(profile.activityLevel);
    
    // Calculate TDEE on initial load if values exist
    if (profile.weight && profile.height && profile.age && 
        (profile.gender === "male" || profile.gender === "female") && 
        profile.activityLevel) {
      calculateTdeeValue(
        profile.weight,
        profile.height,
        profile.age,
        profile.gender,
        profile.activityLevel
      );
    }
  }, []);
  
  // Calculate TDEE
  const calculateTdeeValue = (
    weightValue: number,
    heightValue: number,
    ageValue: number,
    genderValue: "male" | "female",
    activityLevelValue: "sedentary" | "light" | "moderate" | "active" | "very-active" | "extra-active"
  ) => {
    // First calculate BMR
    const calculatedBmr = calculateBMR({
      weight: weightValue,
      height: heightValue,
      age: ageValue,
      gender: genderValue
    });
    
    // Then calculate TDEE
    const calculatedTdee = calculateTDEE({
      bmr: calculatedBmr,
      activityLevel: activityLevelValue
    });
    
    setBmr(calculatedBmr);
    setTdee(calculatedTdee);
    
    // Save results
    storage.saveMetric("bmr", calculatedBmr);
    storage.saveMetric("tdee", calculatedTdee);
    
    // Also save the profile values used for calculation
    storage.saveProfile({
      weight: weightValue,
      height: heightValue,
      age: ageValue,
      gender: genderValue,
      activityLevel: activityLevelValue,
    });
    
    // Show toast
    toast.success("TDEE calculated and saved!", {
      position: "top-center",
      duration: 2000,
    });
  };
  
  // Handle calculate button click
  const handleCalculate = () => {
    calculateTdeeValue(weight, height, age, gender, activityLevel);
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
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">TDEE Calculator</h1>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Total Daily Energy Expenditure (TDEE) represents the total number of calories your body burns in a day, including your basal metabolism, physical activity, and the energy used to digest food.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Section */}
              <TDEEInputForm
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                activityLevel={activityLevel}
                setActivityLevel={setActivityLevel}
                onCalculate={handleCalculate}
              />
              
              {/* Results Section */}
              <TDEEResults bmr={bmr} tdee={tdee} activityLevel={activityLevel} />
            </div>
            
            {/* Information About TDEE */}
            <TDEEInfoSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TDEECalculator;
