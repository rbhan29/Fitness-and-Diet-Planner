export interface Exercise {
  name: string;
  reps: string;
  sets: number;
  restTime: string;
  video?: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  target: string;
  exercises: Exercise[];
  image: string;
}

