import React from "react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-on-scroll">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto opacity-0 animate-on-scroll">
            Real stories from people who improved their health using our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl bg-secondary/50 p-8 shadow-lg opacity-0 animate-on-scroll">
            <p className="text-lg mb-4">“The calculators are super easy to use and helped me understand my health better!”</p>
            <span className="font-semibold">— Priya S.</span>
          </div>
          <div className="rounded-xl bg-secondary/50 p-8 shadow-lg opacity-0 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <p className="text-lg mb-4">“Tracking my progress visually keeps me motivated. The dashboard is beautiful!”</p>
            <span className="font-semibold">— Arjun M.</span>
          </div>
          <div className="rounded-xl bg-secondary/50 p-8 shadow-lg opacity-0 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg mb-4">“I love the personalized insights. It feels like having a health coach!”</p>
            <span className="font-semibold">— Sneha R.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
