import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  ActivityIcon, 
  Ruler, 
  Scale, 
  HeartPulse, 
  Heart, 
  Flame, 
  Droplet, 
  Footprints, 
  Moon, 
  Dumbbell
} from "lucide-react";
import CalculatorCard from "@/components/ui-custom/CalculatorCard";
import { useIsMobile } from "@/hooks/use-mobile";

const Calculators = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 sm:pt-28 md:pt-32 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8 sm:mb-12 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-display tracking-tight">Health Calculators</h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto lg:mx-0">
              Accurate tools to calculate and track your health metrics. Choose a calculator below to get started.
            </p>
          </header>
          
          <section className="mb-0 animate-fade-in">
            <div className="flex items-center mb-2">
              <div className="h-5 sm:h-5 w-1 bg-primary rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold font-display">1. Body Composition Metrics</h2>
            </div>
            <p className="mb-6 text-muted-foreground pl-4 border-l-2 border-primary/20 text-base sm:text-lg">
              These metrics assess body size, fat distribution, and overall composition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CalculatorCard 
                title="BMI Calculator" 
                description="Calculate your Body Mass Index (BMI) to assess your weight relative to height."
                icon={Scale}
                to="/calculators/bmi"
                className="hover:shadow-lg"
              />
              <CalculatorCard 
                title="Body Fat Calculator" 
                description="Estimate body fat percentage using U.S. Navy Method and Relative Fat Mass (RFM)."
                icon={ActivityIcon}
                to="/calculators/body-fat"
                className="hover:shadow-lg"
              />
              <CalculatorCard 
                title="Waist Ratios Calculator" 
                description="Calculate Waist-to-Hip, Waist-to-Height, ABSI, and BRI ratios."
                icon={Ruler}
                to="/calculators/waist-ratios"
                className="hover:shadow-lg"
              />
            </div>
          </section>
          
          <section className="mb-0 animate-fade-in [animation-delay:300ms]">
            <div className="flex items-center mb-2">
              <div className="h-5 sm:h-5 w-1 bg-blue-400 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold font-display">2. Cardiovascular Metrics</h2>
            </div>
            <p className="mb-6 text-muted-foreground pl-4 border-l-2 border-blue-400/20 text-base sm:text-lg">
              These metrics focus on heart rate and overall cardiovascular function.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CalculatorCard 
                title="Heart Rate Calculator" 
                description="Calculate your resting and target heart rates for optimal exercise intensity."
                icon={HeartPulse}
                to="/calculators/heart-rate"
                className="hover:shadow-lg"
              />
            </div>
          </section>

          <section className="mb-0 animate-fade-in [animation-delay:200ms]">
            <div className="flex items-center mb-2">
              <div className="h-5 sm:h-5 w-1 bg-orange-400 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold font-display">3. Metabolic Metrics</h2>
            </div>
            <p className="mb-6 text-muted-foreground pl-4 border-l-2 border-orange-400/20 text-base sm:text-lg">
              These metrics help estimate calorie needs and energy expenditure.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CalculatorCard 
                title="BMR Calculator" 
                description="Calculate your Basal Metabolic Rate using different formulas."
                icon={Flame}
                to="/calculators/bmr"
                className="hover:shadow-lg"
              />
              <CalculatorCard 
                title="TDEE Calculator" 
                description="Estimate your Total Daily Energy Expenditure based on activity level."
                icon={Flame}
                to="/calculators/tdee"
                className="hover:shadow-lg"
              />
            </div>
          </section>
          <section className="mb-0 animate-fade-in [animation-delay:300ms]">
            <div className="flex items-center mb-2">
              <div className="h-5 sm:h-5 w-1 bg-blue-400 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold font-display">4. Hydration Metric</h2>
            </div>
            <p className="mb-6 text-muted-foreground pl-4 border-l-2 border-blue-400/20 text-base sm:text-lg">
              Guidelines to help meet your daily hydration needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CalculatorCard 
                title="Water Intake Calculator" 
                description="Estimate your daily water intake needs based on your weight."
                icon={Droplet}
                to="/calculators/water-intake"
                className="hover:shadow-lg"
              />
            </div>
          </section>
          
          <section className="mb-0 animate-fade-in [animation-delay:400ms]">
            <div className="flex items-center mb-2">
              <div className="h-5 sm:h-5 w-1 bg-green-400 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold font-display">5. Physical Activity Metric</h2>
            </div>
            <p className="mb-6 text-muted-foreground pl-4 border-l-2 border-green-400/20 text-base sm:text-lg">
              Simple measures of daily physical activity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CalculatorCard 
                title="Daily Steps Calculator" 
                description="Track and evaluate your daily step count for optimal health."
                icon={Footprints}
                to="/calculators/daily-steps"
                className="hover:shadow-lg"
              />
            </div>
          </section>
          
          <section className="mb-0 animate-fade-in [animation-delay:500ms]">
            <div className="flex items-center mb-2">
              <div className="h-5 sm:h-5 w-1 bg-purple-400 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold font-display">6. Sleep Metric</h2>
            </div>
            <p className="mb-6 text-muted-foreground pl-4 border-l-2 border-purple-400/20 text-base sm:text-lg">
              Measures to assess your sleep quality and patterns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CalculatorCard 
                title="Sleep Efficiency Calculator" 
                description="Calculate the percentage of time in bed spent actually sleeping."
                icon={Moon}
                to="/calculators/sleep-efficiency"
                className="hover:shadow-lg"
              />
            </div>
          </section>
          
          <section className="mb-0 animate-fade-in [animation-delay:600ms]">
            <div className="flex items-center mb-2">
              <div className="h-5 sm:h-5 w-1 bg-gray-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold font-display">7. Strength Assessment Metric</h2>
            </div>
            <p className="mb-6 text-muted-foreground pl-4 border-l-2 border-gray-500/20 text-base sm:text-lg">
              Evaluate relative strength levels across different body weights and genders.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <CalculatorCard 
                title="Wilks Coefficient Calculator" 
                description="Compare powerlifting strength levels across different body weights and genders."
                icon={Dumbbell}
                to="/calculators/wilks"
                className="hover:shadow-lg"
              />
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Calculators;
