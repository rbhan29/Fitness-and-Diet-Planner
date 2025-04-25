import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
  onClick: () => void;
}

const WorkoutCard = ({ workout, onClick }: WorkoutCardProps) => {
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 workout-card cursor-pointer hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={workout.image} 
          alt={workout.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{workout.title}</h3>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {workout.level}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{workout.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{workout.duration}</span>
          </div>
          <span className="bg-secondary/10 text-secondary-foreground px-2 py-0.5 rounded text-xs">
            {workout.target}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
