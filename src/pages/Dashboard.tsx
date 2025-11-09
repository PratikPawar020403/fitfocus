import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { storage, UserMetrics } from "@/utils/storage";
import { toast } from "sonner";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import MetricsSection from "@/components/dashboard/MetricsSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardProfile {
  gender?: 'male' | 'female';
  age?: number;
  weight?: number;
  height?: number;
  waist?: number;
  hip?: number;
  neck?: number;
  wrist?: number;
  restingHR?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active' | 'extra-active';
}

const SESSION_KEY = 'current-health-session';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<UserMetrics>({});
  const [profile, setProfile] = useState<DashboardProfile>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if this is a new session
    const isNewSession = !sessionStorage.getItem(SESSION_KEY);
    
    if (isNewSession) {
      // Clear all metrics from storage when starting a new session
      storage.clearAll();
      
      // Set session flag to track this browser session
      sessionStorage.setItem(SESSION_KEY, 'active');
      
      // Initialize with empty states
      setMetrics({});
      setProfile({});
      
      // Show welcome toast on first visit
      setTimeout(() => {
        toast.info("Welcome to your health dashboard! Start by using our calculators to track your metrics.", {
          duration: 5000,
        });
        sessionStorage.setItem("has-visited-dashboard", "true");
      }, 1000);
      
      setLoading(false);
    } else {
      // Not a new session, load metrics from storage
      const loadMetrics = () => {
        const storedMetrics = storage.getMetrics();
        const storedProfile = storage.getProfile();
        
        // Check if we have any valid metrics (not just lastUpdated)
        const hasValidMetrics = Object.keys(storedMetrics).length > 0 && 
          Object.keys(storedMetrics).some(key => key !== 'lastUpdated');
        
        if (hasValidMetrics) {
          // Use stored metrics if they exist
          setMetrics(storedMetrics);
          
          // Extract relevant profile fields
          const dashboardProfile: DashboardProfile = {};
          if (storedProfile.gender && ['male', 'female'].includes(storedProfile.gender)) {
            dashboardProfile.gender = storedProfile.gender as 'male' | 'female';
          }
          if (storedProfile.age) dashboardProfile.age = storedProfile.age;
          if (storedProfile.weight) dashboardProfile.weight = storedProfile.weight;
          if (storedProfile.height) dashboardProfile.height = storedProfile.height;
          if (storedProfile.waist) dashboardProfile.waist = storedProfile.waist;
          if (storedProfile.hip) dashboardProfile.hip = storedProfile.hip;
          if (storedProfile.neck) dashboardProfile.neck = storedProfile.neck;
          if (storedProfile.wrist) dashboardProfile.wrist = storedProfile.wrist;
          if (storedProfile.restingHR) dashboardProfile.restingHR = storedProfile.restingHR;
          if (storedProfile.activityLevel) dashboardProfile.activityLevel = storedProfile.activityLevel;
          
          setProfile(dashboardProfile);
        }
        
        setLoading(false);
      };
      
      // Load metrics
      loadMetrics();
      
      // Set up a listener for storage changes from other tabs/windows
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key && event.key.startsWith('health-metrics-')) {
          loadMetrics();
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      // This will run when component is unmounted
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);
  
  const handleMetricClick = (calculator: string) => {
    window.location.href = `/calculators/${calculator}`;
  };

  // Only show metrics if there are any
  const hasMetrics = Object.keys(metrics).length > 0 && 
    Object.keys(metrics).some(key => key !== 'lastUpdated');

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <DashboardLoading />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <DashboardHeader />
          
          {hasMetrics ? (
            <MetricsSection 
              metrics={metrics} 
              profile={profile} 
              onMetricClick={handleMetricClick} 
            />
          ) : (
            <EmptyDashboard />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
