
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import CalculatorCardItem from "./CalculatorCardItem";
import { calculatorCards } from "@/data/calculatorCardsData";

const CalculatorCarousel: React.FC = () => {
  return (
    <section className="py-6 sm:py-6 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3 sm:mb-2 opacity-0 animate-on-scroll">Popular Health Calculators</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-on-scroll mb-3 sm:mb-2">
            Explore our most-used tools to monitor your health metrics
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto opacity-0 animate-on-scroll">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {calculatorCards.map((card, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <CalculatorCardItem
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    path={card.path}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCarousel;
