
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Dumbbell, Utensils, Users } from "lucide-react";
import { PreviewCard } from "./PreviewCard";

const workoutPreviews = [
  {
    title: "Full Body Blast",
    description: "A complete workout targeting all major muscle groups",
    level: "Intermediate",
    duration: "45 mins",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Core Crusher",
    description: "Focused ab workout to strengthen your core",
    level: "Beginner",
    duration: "30 mins",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Upper Body Power",
    description: "Build strength in your chest, shoulders, and arms",
    level: "Advanced",
    duration: "50 mins",
    image: "https://images.unsplash.com/photo-1677741447224-0d228455bceb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const mealPreviews = [
  {
    title: "High Protein Breakfast",
    description: "Start your day with 30g of protein",
    calories: 450,
    prepTime: "15 mins",
    image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Muscle Building Lunch",
    description: "The perfect post-workout meal",
    calories: 650,
    prepTime: "20 mins",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Balanced Dinner",
    description: "Nutritious evening meal with all macros",
    calories: 550,
    prepTime: "25 mins",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60"
  }
];

const communityPosts = [
  {
    user: "FitnessFanatic",
    title: "My 12-Week Transformation",
    excerpt: "How I lost 30 pounds and gained muscle in just 3 months!",
    likes: 248,
    comments: 42,
    image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&auto=format&fit=crop&q=60"
  },
  {
    user: "HealthyEater",
    title: "Meal Prep Sunday",
    excerpt: "My go-to recipes for a full week of healthy eating",
    likes: 182,
    comments: 29,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=60"
  },
  {
    user: "MarathonRunner",
    title: "First Marathon Experience",
    excerpt: "From couch to 26.2 miles - my journey and tips",
    likes: 315,
    comments: 57,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=60"
  }
];

export const PreviewSections = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-2 text-center">Workout Previews</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Discover workouts tailored to your fitness level and goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workoutPreviews.map((workout, index) => (
              <PreviewCard
                key={index}
                image={workout.image}
                title={workout.title}
                description={workout.description}
                metadata={{
                  label: workout.duration,
                  value: workout.level
                }}
                action={{
                  icon: Dumbbell,
                  label: "Start",
                  onClick: () => navigate('/workout')
                }}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="font-medium"
              onClick={() => navigate('/workout')}
            >
              View All Workouts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-2 text-center">Meal Plan Previews</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Nutritious and delicious meal plans to support your fitness goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mealPreviews.map((meal, index) => (
              <PreviewCard
                key={index}
                image={meal.image}
                title={meal.title}
                description={meal.description}
                metadata={{
                  label: `Prep: ${meal.prepTime}`,
                  value: `${meal.calories} kcal`
                }}
                action={{
                  icon: Utensils,
                  label: "View",
                  onClick: () => navigate('/diet')
                }}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="font-medium"
              onClick={() => navigate('/diet')}
            >
              Explore All Meal Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-2 text-center">Community Stories</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Get inspired by real success stories from our fitness community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityPosts.map((post, index) => (
              <PreviewCard
                key={index}
                image={post.image}
                title={post.title}
                description={post.excerpt}
                metadata={{
                  label: `❤️ ${post.likes} 💬 ${post.comments}`,
                  value: post.user
                }}
                action={{
                  icon: Users,
                  label: "View",
                  onClick: () => navigate('/community')
                }}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="font-medium"
              onClick={() => navigate('/community')}
            >
              Join the Community <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
