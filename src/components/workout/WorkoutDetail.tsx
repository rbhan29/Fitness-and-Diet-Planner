import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Dumbbell, Play, Pause, StopCircle, RotateCw } from "lucide-react";
import type { Workout } from "@/types/workout";

interface WorkoutDetailProps {
  workout: Workout;
  onBack: () => void;
}

const WorkoutDetail = ({ workout, onBack }: WorkoutDetailProps) => {
  const [timer, setTimer] = useState<number | null>(null); // Timer in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Convert workout duration (e.g., "45 mins") to seconds
  const durationInSeconds = parseInt(workout.duration.split(" ")[0]) * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timer !== null) {
      interval = setInterval(() => {
        setTimer((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer]);

  const startTimer = () => {
    setTimer(durationInSeconds);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setTimer(null);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        ← Back to Workouts
      </Button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={workout.image}
              alt={workout.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-6 space-y-4">
            <h1 className="text-3xl font-bold">{workout.title}</h1>
            <p className="text-muted-foreground">{workout.description}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <span className="bg-muted p-1.5 rounded-full mr-2">
                  <Dumbbell className="h-4 w-4" />
                </span>
                <span>{workout.target}</span>
              </div>
              <div className="flex items-center">
                <span className="bg-muted p-1.5 rounded-full mr-2">
                  <Clock className="h-4 w-4" />
                </span>
                <span>{workout.duration}</span>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {workout.level}
              </div>
            </div>

            <Button
              className="mt-6 w-full sm:w-auto"
              onClick={startTimer}
              disabled={isRunning || timer !== null}
            >
              <Play className="mr-2 h-4 w-4" /> Start Workout
            </Button>

            {/* Timer Display */}
            {timer !== null && (
              <div className="mt-4 bg-card border border-border rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-semibold mb-2">Timer</h2>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{formatTime(timer)}</span>
                  <div className="flex gap-2">
                    {isRunning ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={pauseTimer}
                      >
                        <Pause className="mr-2 h-4 w-4" /> Pause
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resumeTimer}
                      >
                        <RotateCw className="mr-2 h-4 w-4" /> Resume
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopTimer}
                    >
                      <StopCircle className="mr-2 h-4 w-4" /> Stop
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Workout Details</h2>

            <div className="space-y-6">
              {workout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium dark:text-white">
                      {index + 1}. {exercise.name}
                    </h3>
                    <span className="text-sm text-muted-foreground dark:text-white">
                      {exercise.sets} sets
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground dark:text-white">
                    <span>{exercise.reps} reps</span>
                    <span>Rest: {exercise.restTime}</span>
                  </div>
                  {exercise.video && (
                    <div className="mt-4">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${exercise.video}`}
                        title={exercise.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;