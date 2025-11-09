
import { Gauge, ActivityIcon, BedDouble } from "lucide-react";
import { Footprints } from "@/components/ui-custom/lucideIconImports";

export const calculatorCards = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand what it means for your health.",
    icon: Gauge,
    path: "/calculators/bmi"
  },
  {
    title: "TDEE Calculator",
    description: "Find your Total Daily Energy Expenditure to optimize nutrition and fitness goals.",
    icon: ActivityIcon,
    path: "/calculators/tdee"
  },
  {
    title: "Daily Steps",
    description: "Track your daily step count and see how it impacts your overall health.",
    icon: Footprints,
    path: "/calculators/daily-steps"
  },
  {
    title: "Sleep Efficiency",
    description: "Analyze your sleep quality and get insights to improve your rest.",
    icon: BedDouble,
    path: "/calculators/sleep-efficiency"
  }
];
