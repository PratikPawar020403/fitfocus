
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Droplet, ArrowLeft } from "lucide-react";
=======
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Droplet } from "lucide-react";
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
import { storage } from "@/utils/storage";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { calculateWaterIntake } from "@/utils/calculators/hydration";
import WaterIntakeInfoSection from "./water-intake/WaterIntakeInfoSection";
import WaterIntakeResults from "./water-intake/WaterIntakeResults";

const formSchema = z.object({
  weight: z.number().min(20, "Weight must be at least 20kg").max(300, "Weight must be at most 300kg"),
});

type FormValues = z.infer<typeof formSchema>;

const WaterIntakeCalculator = () => {
  const [waterIntake, setWaterIntake] = useState<number | null>(null);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 70,
    },
  });
  
  const onSubmit = (values: FormValues) => {
    try {
      const water = calculateWaterIntake(values.weight);
      setWaterIntake(water);
      
      // Save to localStorage
      storage.saveMetric('waterIntake', water);
      storage.saveProfile({ weight: values.weight });
      
      toast.success("Water intake calculated successfully!");
    } catch (error) {
      toast.error("Failed to calculate water intake. Please check your inputs.");
      console.error(error);
    }
  };
  
  useEffect(() => {
    // Load saved data if available
    const savedProfile = storage.getProfile();
    if (savedProfile.weight) {
      form.setValue('weight', savedProfile.weight);
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
              <Droplet className="h-8 w-8 text-blue-500" />
              Water Intake Calculator
            </h1>
            <p className="text-muted-foreground">
              Estimate your daily water intake needs based on your body weight.
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
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <div className="space-y-2 w-full">
                                  <div className="flex justify-between items-center">
                                    <Input
                                      type="number"
                                      value={field.value}
                                      onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        if (!isNaN(value)) {
                                          field.onChange(value);
                                        }
                                      }}
                                      className="w-24"
                                    />
                                    <span className="text-sm text-muted-foreground">kg</span>
                                  </div>
                                  <Slider
                                    value={[field.value]}
                                    min={20}
                                    max={200}
                                    step={0.5}
                                    onValueChange={(value) => field.onChange(value[0])}
                                  />
                                </div>
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Calculate Water Intake
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {waterIntake && (
                <WaterIntakeResults waterIntake={waterIntake} weight={form.getValues('weight')} />
              )}
            </div>
            
            <div className="lg:col-span-7">
              <WaterIntakeInfoSection />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaterIntakeCalculator;
