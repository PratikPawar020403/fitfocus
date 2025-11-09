import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Footprints } from "@/components/ui-custom/lucideIconImports";
import { ArrowLeft } from "lucide-react";
=======
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Footprints } from "@/components/ui-custom/lucideIconImports";
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
import { storage } from "@/utils/storage";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { getStepsWithStatus } from "@/utils/calculators/activity";
import DailyStepsInfoSection from "./daily-steps/DailyStepsInfoSection";
import DailyStepsResults from "./daily-steps/DailyStepsResults";
import { HealthStatus } from "@/lib/utils";

const formSchema = z.object({
  steps: z.number().min(0, "Steps cannot be negative").max(100000, "Steps must be at most 100,000"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be at most 120"),
});

type FormValues = z.infer<typeof formSchema>;

const DailyStepsCalculator = () => {
  const [stepsResult, setStepsResult] = useState<{ value: number; status: string; description: string } | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steps: 5000,
      age: 35,
    },
  });
  
  const onSubmit = (values: FormValues) => {
    try {
      const result = getStepsWithStatus(values.steps, values.age);
      
      // Ensure that all required properties exist
      const formattedResult = {
        value: result.value,
        status: result.status || "neutral",
        description: result.description || ""
      };
      
      setStepsResult(formattedResult);
      
      // Save to localStorage
      storage.saveMetric('dailySteps', values.steps);
      storage.saveProfile({ age: values.age });
      
      toast.success("Steps assessment completed!");
    } catch (error) {
      toast.error("Failed to assess steps. Please check your inputs.");
      console.error(error);
    }
  };
  
  useEffect(() => {
    // Load saved data if available
    const savedProfile = storage.getProfile();
    if (savedProfile.age) {
      form.setValue('age', savedProfile.age);
    }
<<<<<<< HEAD
  }, [form]);
=======
  }, []);
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
<<<<<<< HEAD
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <NavLink to="/calculators" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calculators
            </NavLink>
          </Button>
=======
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Footprints className="h-8 w-8 text-green-500" />
              Daily Steps Calculator
            </h1>
            <p className="text-muted-foreground">
              Assess your daily physical activity level based on step count.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="steps"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daily Steps</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <div className="space-y-2 w-full">
                                  <div className="flex justify-between items-center">
                                    <Input
                                      type="number"
                                      value={field.value}
                                      onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (!isNaN(value)) {
                                          field.onChange(value);
                                        }
                                      }}
                                      className="w-24"
                                    />
                                    <span className="text-sm text-muted-foreground">steps</span>
                                  </div>
                                  <Slider
                                    value={[field.value]}
                                    min={0}
                                    max={20000}
                                    step={100}
                                    onValueChange={(value) => field.onChange(value[0])}
                                  />
                                </div>
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <div className="space-y-2 w-full">
                                  <div className="flex justify-between items-center">
                                    <Input
                                      type="number"
                                      value={field.value}
                                      onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (!isNaN(value)) {
                                          field.onChange(value);
                                        }
                                      }}
                                      className="w-24"
                                    />
                                    <span className="text-sm text-muted-foreground">years</span>
                                  </div>
                                  <Slider
                                    value={[field.value]}
                                    min={1}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => field.onChange(value[0])}
                                  />
                                </div>
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Evaluate Steps
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {stepsResult && (
                <DailyStepsResults 
                  steps={stepsResult.value} 
                  status={stepsResult.status} 
                  description={stepsResult.description}
                  age={form.getValues('age')}
                />
              )}
            </div>
            
            <div className="lg:col-span-7">
              <DailyStepsInfoSection />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DailyStepsCalculator;
