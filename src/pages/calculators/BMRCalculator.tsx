
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";
import {
  calculateBMR,
  calculateRevisedHarrisBenedictBMR,
  calculateOriginalHarrisBenedictBMR,
} from "@/utils/calculators";
import { storage } from "@/utils/storage";
import { toast } from "sonner";
import BMRInputForm, { BMRFormula } from "./bmr/BMRInputForm";
import BMRResults from "./bmr/BMRResults";
import BMRInfoSection from "./bmr/BMRInfoSection";

const BMRCalculator = () => {
  // State for input values
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [formula, setFormula] = useState<BMRFormula>("mifflin-st-jeor");
  
  // State for results
  const [bmr, setBmr] = useState<number>(0);
  
  // Load saved values on initial render
  useEffect(() => {
    const profile = storage.getProfile();
    if (profile.weight) setWeight(profile.weight);
    if (profile.height) setHeight(profile.height);
    if (profile.age) setAge(profile.age);
    if (profile.gender && (profile.gender === "male" || profile.gender === "female")) {
      setGender(profile.gender);
    }
    
    // Calculate BMR on initial load if values exist
    if (profile.weight && profile.height && profile.age && 
        (profile.gender === "male" || profile.gender === "female")) {
      calculateBmrValue(
        profile.weight,
        profile.height,
        profile.age,
        profile.gender,
        formula
      );
    }
  }, []);
  
  // Calculate BMR based on selected formula
  const calculateBmrValue = (
    weightValue: number,
    heightValue: number,
    ageValue: number,
    genderValue: "male" | "female",
    formulaType: BMRFormula
  ) => {
    let calculatedBmr: number;
    
    switch (formulaType) {
      case "mifflin-st-jeor":
        calculatedBmr = calculateBMR({
          weight: weightValue,
          height: heightValue,
          age: ageValue,
          gender: genderValue
        });
        break;
      case "revised-harris-benedict":
        calculatedBmr = calculateRevisedHarrisBenedictBMR({
          weight: weightValue,
          height: heightValue,
          age: ageValue,
          gender: genderValue
        });
        break;
      case "original-harris-benedict":
        calculatedBmr = calculateOriginalHarrisBenedictBMR({
          weight: weightValue,
          height: heightValue,
          age: ageValue,
          gender: genderValue
        });
        break;
      default:
        calculatedBmr = calculateBMR({
          weight: weightValue,
          height: heightValue,
          age: ageValue,
          gender: genderValue
        });
    }
    
    setBmr(calculatedBmr);
    
    // Save results
    storage.saveMetric("bmr", calculatedBmr);
    
    // Also save the profile values used for calculation
    storage.saveProfile({
      weight: weightValue,
      height: heightValue,
      age: ageValue,
      gender: genderValue,
    });
    
    // Show toast
    toast.success("BMR calculated and saved!", {
      position: "top-center",
      duration: 2000,
    });
  };
  
  // Handle calculate button click
  const handleCalculate = () => {
    calculateBmrValue(weight, height, age, gender, formula);
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
              <h1 className="text-2xl font-bold">BMR Calculator</h1>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological functions while at rest. It represents the minimum amount of energy needed to keep your body functioning, including breathing and maintaining body temperature.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Section */}
              <BMRInputForm
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                formula={formula}
                setFormula={setFormula}
                onCalculate={handleCalculate}
              />
              
              {/* Results Section */}
              <BMRResults bmr={bmr} formula={formula} />
            </div>
            
            {/* Information About BMR */}
            <BMRInfoSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BMRCalculator;
