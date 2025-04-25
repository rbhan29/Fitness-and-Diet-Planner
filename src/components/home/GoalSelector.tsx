
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GoalSelector = () => {
  const navigate = useNavigate();

  return (
    <section id="goal-selector" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What's Your Fitness Goal?
        </h2>
        
        <Tabs
          defaultValue="lose-weight"
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="lose-weight">Lose Weight</TabsTrigger>
            <TabsTrigger value="build-muscle">Build Muscle</TabsTrigger>
            <TabsTrigger value="eat-healthier">Eat Healthier</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lose-weight" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Burn Fat, Feel Great
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Our weight loss programs combine cardio, strength training, and nutrition guidance to help you shed pounds sustainably. You'll lose weight while preserving muscle and boosting your energy levels.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Cardio-focused workout routines
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Calorie-deficit meal plans
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Progressive fat loss tracking
                  </li>
                </ul>
                <Button 
                  className="font-medium"
                  onClick={() => navigate('/workout')}
                >
                  Explore Weight Loss Workouts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1551525212-a1dc18871d4a?w=800&auto=format&fit=crop&q=60" 
                  alt="Weight Loss" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="build-muscle" className="space-y-6">
            {/* ... Similar structure as lose-weight tab, different content */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Build Strength & Definition
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Our muscle building programs focus on progressive overload training and protein-rich nutrition to help you gain lean muscle mass and strength efficiently.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Hypertrophy-focused training splits
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Protein-optimized meal plans
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Strength progression tracking
                  </li>
                </ul>
                <Button 
                  className="font-medium"
                  onClick={() => navigate('/workout')}
                >
                  Explore Muscle Building Workouts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&auto=format&fit=crop&q=60" 
                  alt="Muscle Building" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="eat-healthier" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Fuel Your Body Right
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Our nutrition programs help you develop healthy eating habits with balanced meal plans that provide all the nutrients your body needs for optimal performance.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Balanced macro & micronutrient plans
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Meal prep guides & recipes
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">✓</span>
                    Nutrition tracking tools
                  </li>
                </ul>
                <Button 
                  className="font-medium"
                  onClick={() => navigate('/diet')}
                >
                  Explore Meal Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60" 
                  alt="Healthy Eating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
