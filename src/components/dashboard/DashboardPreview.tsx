
import { useStats } from "@/hooks/use-stats";
import { StatCard } from "./StatCard";

export const DashboardPreview = () => {
  const stats = useStats();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Your Progress Dashboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your fitness journey with detailed metrics and insights
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Workouts"
              value={stats.workouts.count}
              label="This Month"
              change={stats.workouts.change}
              className="animate-fade-in"
              />
            <StatCard
              title="Calories"
              value={stats.calories.burned.toLocaleString()}
              label="Burned"
              change={stats.calories.change}
              className="animate-fade-in [animation-delay:200ms]"
            />
            <StatCard
              title="Current Weight"
              value={`${stats.weight.current} kg`}
              label="Updated Today"
              change={stats.weight.change}
              className="animate-fade-in [animation-delay:400ms]"
            />
            <StatCard
              title="Goal Progress"
              value={`${stats.progress.percentage}%`}
              label="Weight Loss"
              change={stats.progress.change}
              className="animate-fade-in [animation-delay:600ms]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
