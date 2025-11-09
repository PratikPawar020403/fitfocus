
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Weight, Scale, Dumbbell } from "lucide-react";
import { calculateWilksWithStatus } from "@/utils/calculators";
import { storage } from "@/utils/storage"; 
import WilksResults from "./WilksResults";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MetricField from "@/components/ui-custom/MetricField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WilksFormData {
  bodyWeight: number;
  liftedWeight: number;
  gender: 'male' | 'female';
  benchPress?: number;
  squat?: number;
  deadlift?: number;
  calculationMethod: 'separate' | 'combined';
}

const WilksForm = () => {
  const [wilksScore, setWilksScore] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("neutral");
  const [description, setDescription] = useState<string>("");
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<WilksFormData>({
    defaultValues: {
      bodyWeight: 0,
      liftedWeight: 0,
      gender: 'male',
      benchPress: 0,
      squat: 0,
      deadlift: 0,
      calculationMethod: 'combined',
    }
  });
  
  const [formValues, setFormValues] = useState<WilksFormData>({
    bodyWeight: 0,
    liftedWeight: 0,
    gender: 'male',
    benchPress: 0,
    squat: 0,
    deadlift: 0,
    calculationMethod: 'combined',
  });
  
  const watchGender = watch("gender");
  const watchCalculationMethod = watch("calculationMethod");
  
  useEffect(() => {
    // Load user profile data if available
    const profile = storage.getProfile();
    
    if (profile.weight) {
      setValue("bodyWeight", profile.weight);
      setFormValues(prev => ({ ...prev, bodyWeight: profile.weight || 0 }));
    }
    
    if (profile.gender && (profile.gender === 'male' || profile.gender === 'female')) {
      setValue("gender", profile.gender);
      setFormValues(prev => ({ ...prev, gender: profile.gender as 'male' | 'female' }));
    }
  }, [setValue]);

  // Calculate total weight when individual lifts change
  useEffect(() => {
    if (watchCalculationMethod === 'separate') {
      const total = (formValues.benchPress || 0) + (formValues.squat || 0) + (formValues.deadlift || 0);
      setValue("liftedWeight", total);
      setFormValues(prev => ({ ...prev, liftedWeight: total }));
    }
  }, [formValues.benchPress, formValues.squat, formValues.deadlift, watchCalculationMethod, setValue]);
  
  const onSubmit = (data: WilksFormData) => {
    // If using separate lifts for total, calculate the sum
    if (data.calculationMethod === 'separate') {
      data.liftedWeight = (data.benchPress || 0) + (data.squat || 0) + (data.deadlift || 0);
    }
    
    // Calculate Wilks score
    const result = calculateWilksWithStatus({
      bodyWeight: data.bodyWeight,
      liftedWeight: data.liftedWeight,
      gender: data.gender
    });
    
    setWilksScore(result.value);
    setStatus(result.status || "neutral");
    setDescription(result.description || "");
    
    // Save result to storage
    storage.saveMetric("wilksScore", result.value);
    
    // Save profile data
    storage.saveProfile({
      weight: data.bodyWeight,
      gender: data.gender,
    });
  };
  
  const handleBodyWeightChange = (value: number) => {
    setValue("bodyWeight", value);
    setFormValues(prev => ({ ...prev, bodyWeight: value }));
  };
  
  const handleLiftedWeightChange = (value: number) => {
    setValue("liftedWeight", value);
    setFormValues(prev => ({ ...prev, liftedWeight: value }));
  };

  const handleBenchPressChange = (value: number) => {
    setValue("benchPress", value);
    setFormValues(prev => ({ ...prev, benchPress: value }));
  };

  const handleSquatChange = (value: number) => {
    setValue("squat", value);
    setFormValues(prev => ({ ...prev, squat: value }));
  };

  const handleDeadliftChange = (value: number) => {
    setValue("deadlift", value);
    setFormValues(prev => ({ ...prev, deadlift: value }));
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <Select 
              value={formValues.gender}
              onValueChange={(value: 'male' | 'female') => {
                setValue("gender", value);
                setFormValues(prev => ({ ...prev, gender: value }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <MetricField
            label="Body Weight"
            value={formValues.bodyWeight}
            onChange={handleBodyWeightChange}
            min={40}
            max={200}
            step={0.1}
            unit="kg"
            decimals={1}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Calculation Method</label>
            <RadioGroup 
              defaultValue={formValues.calculationMethod} 
              value={watchCalculationMethod}
              onValueChange={(value: 'separate' | 'combined') => {
                setValue("calculationMethod", value);
                setFormValues(prev => ({ ...prev, calculationMethod: value }));
              }}
              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <div className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer ${watchCalculationMethod === 'separate' ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-muted/50'}`}>
                <RadioGroupItem value="separate" id="separate" className="sr-only" />
                <Label htmlFor="separate" className={`text-sm font-medium cursor-pointer ${watchCalculationMethod === 'separate' ? 'text-primary' : ''}`}>
                  Enter Lifts Separately
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer ${watchCalculationMethod === 'combined' ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-muted/50'}`}>
                <RadioGroupItem value="combined" id="combined" className="sr-only" />
                <Label htmlFor="combined" className={`text-sm font-medium cursor-pointer ${watchCalculationMethod === 'combined' ? 'text-primary' : ''}`}>
                  Enter Total Weight
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {watchCalculationMethod === 'separate' ? (
            <div className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">Enter your best bench press, squat and deadlift (conventional or sumo)</p>
              
              <MetricField
                label="Bench Press"
                value={formValues.benchPress || 0}
                onChange={handleBenchPressChange}
                min={0}
                max={500}
                step={1}
                unit="kg"
                decimals={0}
              />
              
              <MetricField
                label="Squat"
                value={formValues.squat || 0}
                onChange={handleSquatChange}
                min={0}
                max={500}
                step={1}
                unit="kg"
                decimals={0}
              />
              
              <MetricField
                label="Deadlift"
                value={formValues.deadlift || 0}
                onChange={handleDeadliftChange}
                min={0}
                max={500}
                step={1}
                unit="kg"
                decimals={0}
              />
              
              <div className="pt-2">
                <p className="text-sm font-medium">Total Weight: <span className="font-bold">{formValues.liftedWeight} kg</span></p>
              </div>
            </div>
          ) : (
            <MetricField
              label="Total Weight Lifted (Squat + Bench + Deadlift)"
              value={formValues.liftedWeight}
              onChange={handleLiftedWeightChange}
              min={0}
              max={1000}
              step={1}
              unit="kg"
              decimals={0}
            />
          )}
        </div>
        
        <Button type="submit" className="w-full">
          <Dumbbell className="mr-2 h-4 w-4" />
          Calculate Wilks Coefficient
        </Button>
      </form>
      
      {wilksScore !== null && (
        <WilksResults 
          wilksScore={wilksScore}
          status={status}
          description={description}
          liftedWeight={watch("liftedWeight")}
          bodyWeight={watch("bodyWeight")}
          benchPress={watch("benchPress")}
          squat={watch("squat")}
          deadlift={watch("deadlift")}
          calculationMethod={watch("calculationMethod")}
        />
      )}
    </div>
  );
};

export default WilksForm;
