
import React from "react";
import { ActivityIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 md:py-12 border-t border-gray-100 dark:border-gray-800 mt-8 md:mt-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <ActivityIcon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <span className="font-semibold text-lg md:text-xl">HealthMetrics</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Track, analyze, and improve your health metrics with our comprehensive tools.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-xs md:text-sm uppercase tracking-wider text-muted-foreground mb-3 md:mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-xs md:text-sm hover:text-primary transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="text-xs md:text-sm hover:text-primary transition-colors">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculators" className="text-xs md:text-sm hover:text-primary transition-colors">
                  Calculators
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-xs md:text-sm uppercase tracking-wider text-muted-foreground mb-3 md:mb-4">
              Calculators
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/calculators/bmi" className="text-xs md:text-sm hover:text-primary transition-colors">
                  BMI Calculator
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculators/bmr" className="text-xs md:text-sm hover:text-primary transition-colors">
                  BMR Calculator
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculators/body-fat" className="text-xs md:text-sm hover:text-primary transition-colors">
                  Body Fat Calculator
                </NavLink>
              </li>
              <li>
                <NavLink to="/calculators" className="text-xs md:text-sm hover:text-primary transition-colors">
                  View All Calculators →
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-xs md:text-sm uppercase tracking-wider text-muted-foreground mb-3 md:mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs md:text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-xs md:text-sm hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-xs md:text-sm hover:text-primary transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} HealthMetrics. All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0">
            <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-right">
              Medical disclaimer: This app provides general information only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
