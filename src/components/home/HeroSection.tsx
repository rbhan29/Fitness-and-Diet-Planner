
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const HeroSection = () => {
  const scrollToGoalSelector = () => {
    const goalSelectorElement = document.getElementById('goal-selector');
    if (goalSelectorElement) {
      goalSelectorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&auto=format&fit=crop&q=60"
          alt="Fitness Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg animate-fade-in">
          Transform Your Body,<br />Transform Your Life
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Your customized fitness journey starts here. Set goals, track progress, and achieve results.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
          onClick={scrollToGoalSelector}
        >
          Get Started <ChevronRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
};
