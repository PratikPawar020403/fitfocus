import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Moon, ArrowLeft } from "lucide-react";
import { storage } from "@/utils/storage";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { calculateSleepEfficiencyWithStatus } from "@/utils/calculators/sleep";
import SleepEfficiencyInfoSection from "./sleep-efficiency/SleepEfficiencyInfoSection";
import SleepEfficiencyResults from "./sleep-efficiency/SleepEfficiencyResults";
import { HealthStatus } from "@/lib/utils";

const formSchema = z.object({
  hoursInBed: z.number().min(1, "Hours in bed must be at least 1").max(24, "Hours in bed must be at most 24"),
  minutesInBed: z.number().min(0, "Minutes must be between 0-59").max(59, "Minutes must be between 0-59"),
  hoursSleeping: z.number().min(0, "Hours sleeping must be at least 0").max(24, "Hours sleeping must be at most 24"),
  minutesSleeping: z.number().min(0, "Minutes must be between 0-59").max(59, "Minutes must be between 0-59"),
}).refine((data) => {
  const totalInBed = data.hoursInBed * 60 + data.minutesInBed;
  const totalSleeping = data.hoursSleeping * 60 + data.minutesSleeping;
  return totalSleeping <= totalInBed;
}, {
  message: "Sleep time cannot exceed time in bed",
  path: ["hoursSleeping"]
});

type FormValues = z.infer<typeof formSchema>;

const SleepEfficiencyCalculator = () => {
  const [efficiencyResult, setEfficiencyResult] = useState<{ value: number; status: string; description: string } | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hoursInBed: 8,
      minutesInBed: 0,
      hoursSleeping: 7,
      minutesSleeping: 0,
    },
  });
  
  const onSubmit = (values: FormValues) => {
    try {
      const totalTimeInBedMinutes = values.hoursInBed * 60 + values.minutesInBed;
      const totalSleepTimeMinutes = values.hoursSleeping * 60 + values.minutesSleeping;
      
      const result = calculateSleepEfficiencyWithStatus({
        totalTimeInBedMinutes,
        totalSleepTimeMinutes
      });
      
      const formattedResult = {
        value: result.value,
        status: result.status || "neutral",
        description: result.description || ""
      };
      
      setEfficiencyResult(formattedResult);
      
      storage.saveMetric('sleepEfficiency', result.value);
      
      toast.success("Sleep efficiency calculated successfully!");
    } catch (error) {
      toast.error("Failed to calculate sleep efficiency. Please check your inputs.");
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <NavLink to="/calculators" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calculators
            </NavLink>
          </Button>
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Moon className="h-8 w-8 text-purple-500" />
              Sleep Efficiency Calculator
            </h1>
            <p className="text-muted-foreground">
              Calculate the percentage of time in bed that you spend actually sleeping.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Time in Bed</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="hoursInBed"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hours</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      if (!isNaN(value)) {
                                        field.onChange(value);
                                      }
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="minutesInBed"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Minutes</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      if (!isNaN(value)) {
                                        field.onChange(value);
                                      }
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Time Sleeping</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="hoursSleeping"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hours</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      if (!isNaN(value)) {
                                        field.onChange(value);
                                      }
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="minutesSleeping"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Minutes</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      if (!isNaN(value)) {
                                        field.onChange(value);
                                      }
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Calculate Sleep Efficiency
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {efficiencyResult && (
                <SleepEfficiencyResults 
                  efficiency={efficiencyResult.value}
                  status={efficiencyResult.status}
                  description={efficiencyResult.description}
                  timeInBed={form.getValues('hoursInBed') * 60 + form.getValues('minutesInBed')}
                  timeSleeping={form.getValues('hoursSleeping') * 60 + form.getValues('minutesSleeping')}
                />
              )}
            </div>
            
            <div className="lg:col-span-7">
              <SleepEfficiencyInfoSection />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SleepEfficiencyCalculator;
