import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeToggler from "@/components/ui-custom/ThemeToggler";

const NAVBAR_HEIGHT = 64; // px

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      <Navbar />
      {/* Add top padding to prevent content from being hidden behind fixed navbar */}
      <main id="main-content" className="flex-1 flex flex-col gap-0" style={{paddingTop: NAVBAR_HEIGHT + 8}}>
        {/* HERO */}
        <section className="py-10 md:py-14 px-4 md:px-0 bg-gradient-to-br from-primary/5 to-background flex flex-col items-center text-center animate-fade-in" style={{animationDelay: '0.05s'}}>
          <h1 className="font-inter text-4xl md:text-5xl font-extrabold tracking-tight mb-2 md:mb-4 animate-slide-up text-gray-900 dark:text-white" style={{animationDelay: '0.15s'}}>Smarter Health Starts Here</h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl animate-slide-up" style={{animationDelay: '0.25s'}}>All-in-one platform to track, analyze, and improve your health metrics with personalized calculators and actionable insights.</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-zoom-in" style={{animationDelay: '0.35s'}}>
<<<<<<< HEAD
            <Link to="/dashboard" className="px-8 py-3 rounded-full text-base md:text-lg font-semibold bg-primary text-white shadow-md hover:bg-primary/90 transition">Get Started</Link>
            <Link to="/calculators" className="px-8 py-3 rounded-full text-base md:text-lg font-semibold border border-primary text-primary bg-transparent hover:bg-primary/10 transition">Explore Calculators</Link>
=======
            <a href="/dashboard" className="px-8 py-3 rounded-full text-base md:text-lg font-semibold bg-primary text-white shadow-md hover:bg-primary/90 transition">Get Started</a>
            <a href="/calculators" className="px-8 py-3 rounded-full text-base md:text-lg font-semibold border border-primary text-primary bg-transparent hover:bg-primary/10 transition">Explore Calculators</a>
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="py-7 md:py-10 border-b border-border/40 bg-white dark:bg-background animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center">
            <div className="flex flex-col items-center p-4 md:p-6 rounded-xl hover:bg-primary/5 transition animate-slide-up" style={{animationDelay: '0.45s'}}>
              <h3 className="font-inter font-semibold text-lg md:text-xl mb-1 md:mb-2 text-primary">Instant Insights</h3>
              <p className="text-muted-foreground text-sm md:text-base">See your progress and health trends in real time.</p>
            </div>
            <div className="flex flex-col items-center p-4 md:p-6 rounded-xl hover:bg-primary/5 transition animate-slide-up" style={{animationDelay: '0.5s'}}>
              <h3 className="font-inter font-semibold text-lg md:text-xl mb-1 md:mb-2 text-primary">Personalized Tools</h3>
              <p className="text-muted-foreground text-sm md:text-base">Calculators and dashboards tailored to your needs.</p>
            </div>
            <div className="flex flex-col items-center p-4 md:p-6 rounded-xl hover:bg-primary/5 transition animate-slide-up" style={{animationDelay: '0.55s'}}>
              <h3 className="font-inter font-semibold text-lg md:text-xl mb-1 md:mb-2 text-primary">Private & Secure</h3>
              <p className="text-muted-foreground text-sm md:text-base">Your health data is always safe and confidential.</p>
            </div>
          </div>
        </section>

        {/* FEATURED CALCULATORS */}
<<<<<<< HEAD
  <section className="py-8 sm:py-6 bg-gradient-to-t from-primary/5 to-background animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="container mx-auto text-center">
            <h2 className="font-inter text-2xl md:text-3xl font-bold mb-3 md:mb-4 animate-slide-up text-gray-900 dark:text-white" style={{animationDelay: '0.65s'}}>Popular Health Calculators</h2>
            <p className="text-muted-foreground mb-6 md:mb-10 text-sm md:text-base animate-fade-in" style={{animationDelay: '0.7s'}}>Quickly access our most-used tools to monitor your health metrics.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-1 md:gap-1">
              <div className="rounded-md border border-border bg-white dark:bg-background p-2 sm:p-2 flex flex-col items-center hover:shadow-sm hover:-translate-y-0.5 transition animate-zoom-in" style={{animationDelay: '0.75s'}}>
                <h3 className="font-inter font-semibold text-base md:text-lg mb-1 sm:mb-1 text-primary">BMI Calculator</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-1 sm:mb-1 md:mb-1">Calculate your Body Mass Index to understand your weight category.</p>
                <Link to="/calculators/bmi" className="w-full px-2.5 py-1 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition text-sm md:text-base">Try it</Link>
              </div>
              <div className="rounded-lg border border-border bg-white dark:bg-background p-2 sm:p-3 flex flex-col items-center hover:shadow-lg hover:-translate-y-0.5 transition animate-zoom-in" style={{animationDelay: '0.8s'}}>
                <h3 className="font-inter font-semibold text-base md:text-lg mb-1 text-primary">TDEE Calculator</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Find your Total Daily Energy Expenditure to optimize your nutrition and fitness goals.</p>
                <Link to="/calculators/tdee" className="w-full px-3 py-1.5 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition text-sm md:text-base">Try it</Link>
              </div>
              <div className="rounded-lg border border-border bg-white dark:bg-background p-2 sm:p-3 flex flex-col items-center hover:shadow-lg hover:-translate-y-0.5 transition animate-zoom-in" style={{animationDelay: '0.85s'}}>
                <h3 className="font-inter font-semibold text-base md:text-lg mb-1 text-primary">Daily Steps</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Track your daily step count and see how it impacts your health.</p>
                <Link to="/calculators/daily-steps" className="w-full px-3 py-1.5 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition text-sm md:text-base">Try it</Link>
=======
        <section className="py-10 md:py-14 bg-gradient-to-t from-primary/5 to-background animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="container mx-auto text-center">
            <h2 className="font-inter text-2xl md:text-3xl font-bold mb-3 md:mb-4 animate-slide-up text-gray-900 dark:text-white" style={{animationDelay: '0.65s'}}>Popular Health Calculators</h2>
            <p className="text-muted-foreground mb-6 md:mb-10 text-sm md:text-base animate-fade-in" style={{animationDelay: '0.7s'}}>Quickly access our most-used tools to monitor your health metrics.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              <div className="rounded-xl border border-border bg-white dark:bg-background p-3 md:p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition animate-zoom-in" style={{animationDelay: '0.75s'}}>
                <h3 className="font-inter font-semibold text-base md:text-lg mb-1 text-primary">BMI Calculator</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Calculate your Body Mass Index to understand your weight category.</p>
                <a href="/calculators/bmi" className="w-full px-4 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition text-sm md:text-base">Try it</a>
              </div>
              <div className="rounded-xl border border-border bg-white dark:bg-background p-3 md:p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition animate-zoom-in" style={{animationDelay: '0.8s'}}>
                <h3 className="font-inter font-semibold text-base md:text-lg mb-1 text-primary">TDEE Calculator</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Find your Total Daily Energy Expenditure to optimize your nutrition and fitness goals.</p>
                <a href="/calculators/tdee" className="w-full px-4 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition text-sm md:text-base">Try it</a>
              </div>
              <div className="rounded-xl border border-border bg-white dark:bg-background p-3 md:p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition animate-zoom-in" style={{animationDelay: '0.85s'}}>
                <h3 className="font-inter font-semibold text-base md:text-lg mb-1 text-primary">Daily Steps</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Track your daily step count and see how it impacts your health.</p>
                <a href="/calculators/daily-steps" className="w-full px-4 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition text-sm md:text-base">Try it</a>
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-10 md:py-14 bg-white dark:bg-background animate-fade-in" style={{animationDelay: '0.9s'}}>
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-inter text-2xl md:text-3xl font-bold mb-3 md:mb-4 animate-slide-up text-gray-900 dark:text-white" style={{animationDelay: '0.95s'}}>How It Works</h2>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base animate-fade-in" style={{animationDelay: '1.0s'}}>Start tracking your health in 3 easy steps.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div className="flex flex-col items-center p-3 md:p-4 rounded-xl hover:bg-primary/5 transition animate-slide-up" style={{animationDelay: '1.05s'}}>
                <span className="font-semibold text-primary text-xl md:text-2xl mb-1">1</span>
                <span className="font-semibold mb-1">Choose a Calculator</span>
                <span className="text-xs md:text-sm text-muted-foreground">Select from BMI, BMR, TDEE, and more.</span>
              </div>
              <div className="flex flex-col items-center p-3 md:p-4 rounded-xl hover:bg-primary/5 transition animate-slide-up" style={{animationDelay: '1.1s'}}>
                <span className="font-semibold text-primary text-xl md:text-2xl mb-1">2</span>
                <span className="font-semibold mb-1">Enter Your Details</span>
                <span className="text-xs md:text-sm text-muted-foreground">Fill in your data for personalized results.</span>
              </div>
              <div className="flex flex-col items-center p-3 md:p-4 rounded-xl hover:bg-primary/5 transition animate-slide-up" style={{animationDelay: '1.15s'}}>
                <span className="font-semibold text-primary text-xl md:text-2xl mb-1">3</span>
                <span className="font-semibold mb-1">Get Insights</span>
                <span className="text-xs md:text-sm text-muted-foreground">See your metrics and actionable advice instantly.</span>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-14 md:py-20 bg-[#f5faff] text-center animate-fade-in" style={{animationDelay: '1.2s'}}>
          <div className="container mx-auto flex flex-col items-center justify-center">
            <h2 className="font-inter text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white animate-slide-up" style={{animationDelay: '1.25s'}}>Start Your Health Journey Today</h2>
            <p className="mb-6 md:mb-8 text-lg md:text-xl text-gray-500 animate-fade-in max-w-2xl" style={{animationDelay: '1.3s'}}>Get instant access to all our health calculators and start tracking your metrics.</p>
<<<<<<< HEAD
            <Link to="/dashboard" className="px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition animate-zoom-in" style={{animationDelay: '1.35s'}}>Go to Dashboard</Link>
          </div>
        </section>
      </main>

=======
            <a href="/dashboard" className="px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition animate-zoom-in" style={{animationDelay: '1.35s'}}>Go to Dashboard</a>
          </div>
        </section>
      </main>
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in" style={{animationDelay: '1.4s'}}>
        <ThemeToggler className="shadow-lg hover:shadow-xl" />
      </div>
>>>>>>> 755444eff2a606db1e26dd66e32748c17500068b
      <Footer />
    </div>
  );
};

export default Index;
