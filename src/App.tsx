
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import LightDarkLoader from "@/components/ui-custom/LightDarkLoader";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Calculators from "./pages/Calculators";
import BMICalculator from "./pages/calculators/BMICalculator";
import BMRCalculator from "./pages/calculators/BMRCalculator";
import TDEECalculator from "./pages/calculators/TDEECalculator";
import WaistRatiosCalculator from "./pages/calculators/WaistRatiosCalculator";
import HeartRateCalculator from "./pages/calculators/HeartRateCalculator";
import WaterIntakeCalculator from "./pages/calculators/WaterIntakeCalculator";
import DailyStepsCalculator from "./pages/calculators/DailyStepsCalculator";
import SleepEfficiencyCalculator from "./pages/calculators/SleepEfficiencyCalculator";
import WilksCalculator from "./pages/calculators/WilksCalculator";
import NotFound from "./pages/NotFound";
import BodyFatCalculator from "./pages/calculators/BodyFatCalculator";
<<<<<<< HEAD
import ScrollToTop from "@/components/layout/ScrollToTop";
=======
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <LightDarkLoader />
      <TooltipProvider>
        <Toaster />
        <Sonner />
<<<<<<< HEAD
        <ScrollToTop />
=======
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/bmi" element={<BMICalculator />} />
          <Route path="/calculators/bmr" element={<BMRCalculator />} />
          <Route path="/calculators/tdee" element={<TDEECalculator />} />
          <Route path="/calculators/waist-ratios" element={<WaistRatiosCalculator />} />
          <Route path="/calculators/body-fat" element={<BodyFatCalculator />} />
          <Route path="/calculators/heart-rate" element={<HeartRateCalculator />} />
          <Route path="/calculators/water-intake" element={<WaterIntakeCalculator />} />
          <Route path="/calculators/daily-steps" element={<DailyStepsCalculator />} />
          <Route path="/calculators/sleep-efficiency" element={<SleepEfficiencyCalculator />} />
          <Route path="/calculators/wilks" element={<WilksCalculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
