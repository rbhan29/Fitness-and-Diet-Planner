import { useState } from "react";
import type { Workout } from "@/types/workout";


const workouts: Workout[] = [
  {
    id: "chest-1",
    title: "Chest Pump",
    description: "Build a stronger, more defined chest with this targeted workout",
    level: "Intermediate",
    duration: "45 mins",
    target: "Chest",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10", restTime: "90 sec", video: "gRVjAtPip0Y" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", restTime: "60 sec", video: "8iPEnn-ltC8" }, // Updated video
      { name: "Dumbbell Flyes", sets: 3, reps: "12-15", restTime: "60 sec", video: "eozdVDA78K0" },
      { name: "Push-ups", sets: 3, reps: "To failure", restTime: "45 sec", video: "IODxDxX7oi4" },
    ],
  },
  {
    id: "chest-2",
    title: "Upper Chest Focus",
    description: "Emphasize upper chest development for a balanced physique",
    level: "Advanced",
    duration: "50 mins",
    target: "Chest",
    image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { name: "Incline Bench Press", sets: 4, reps: "6-8", restTime: "2 min", video: "DbFgADa2PL8" }, 
      { name: "Incline Dumbbell Flyes", sets: 3, reps: "10-12", restTime: "60 sec", video: "eozdVDA78K0" },
      { name: "Landmine Press", sets: 3, reps: "10-12", restTime: "60 sec", video: "3Pr6n-nKfMA" },
      { name: "Cable Upper Chest Crossovers", sets: 3, reps: "12-15", restTime: "45 sec", video: "taI4XduLpTk" }, 
    ],
  },
  {
    id: "arms-1",
    title: "Arm Blaster",
    description: "Sculpt impressive biceps and triceps with this targeted routine",
    level: "Intermediate",
    duration: "40 mins",
    target: "Arms",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { name: "Barbell Curls", sets: 4, reps: "8-10", restTime: "60 sec", video: "ykJmrZ5v0Oo" },
      { name: "Skull Crushers", sets: 4, reps: "8-10", restTime: "60 sec", video: "d_KZxkY_0cM" },
      { name: "Hammer Curls", sets: 3, reps: "10-12", restTime: "45 sec", video: "zC3nLlEvin4" },
      { name: "Tricep Pushdowns", sets: 3, reps: "10-12", restTime: "45 sec", video: "2-LAMcpzODU" },
    ],
  },
  {
    id: "back-1",
    title: "Back Width Builder",
    description: "Develop an impressive back with this lat-focused routine",
    level: "Intermediate",
    duration: "50 mins",
    target: "Back",
    image: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { name: "Pull-ups", sets: 4, reps: "8-10", restTime: "90 sec", video: "eGo4IYlbE5g" },
      { name: "Lat Pulldowns", sets: 3, reps: "10-12", restTime: "60 sec", video: "CAwf7n6Luuc" },
      { name: "Straight Arm Pulldowns", sets: 3, reps: "12-15", restTime: "60 sec", video: "lueEJGjTuPQ" }, // Updated video
      { name: "Single-Arm Dumbbell Rows", sets: 3, reps: "10-12 each", restTime: "45 sec", video: "pYcpY20QaE8" },
    ],
  },
  {
    id: "legs-1",
    title: "Quad Destroyer",
    description: "Build powerful quads with this intense leg workout",
    level: "Intermediate",
    duration: "60 mins",
    target: "Legs",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { name: "Barbell Squats", sets: 4, reps: "8-10", restTime: "2 min", video: "Dy28eq2PjcM" },
      { name: "Leg Press", sets: 3, reps: "10-12", restTime: "90 sec", video: "IZxyjW7MPJQ" },
      { name: "Walking Lunges", sets: 3, reps: "12 each leg", restTime: "60 sec", video: "D7KaRcUTQeE" },
      { name: "Leg Extensions", sets: 3, reps: "12-15", restTime: "45 sec", video: "YyvSfVjQeL0" },
    ],
  },
  {
    id: "core-1",
    title: "Core Crusher",
    description: "Strengthen your entire core region with this targeted routine",
    level: "Beginner",
    duration: "30 mins",
    target: "Core",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { name: "Planks", sets: 3, reps: "30-60 sec", restTime: "45 sec", video: "ASdvN_XEl_c" },
      { name: "Crunches", sets: 3, reps: "15-20", restTime: "30 sec", video: "Xyd_fa5zoEU" },
      { name: "Russian Twists", sets: 3, reps: "20 total", restTime: "30 sec", video: "wkD8rjkodUI" },
      { name: "Leg Raises", sets: 3, reps: "12-15", restTime: "45 sec", video: "JB2oyawG9KI" },
    ],
  },
  {
    id: "home-1",
    title: "Full Body Home Workout",
    description: "A quick and effective full-body workout you can do at home.",
    level: "Beginner",
    duration: "30 mins",
    target: "Home Workout",
    image: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=800&auto=format&fit=crop&q=60", // Added image
    exercises: [
      { name: "Bodyweight Squats", sets: 3, reps: "15-20", restTime: "60 sec", video: "U3HlEF_E9fo" },
      { name: "Push-ups", sets: 3, reps: "10-15", restTime: "60 sec", video: "IODxDxX7oi4" },
      { name: "Plank", sets: 3, reps: "30-60 sec", restTime: "45 sec", video: "ASdvN_XEl_c" },
      { name: "Jumping Jacks", sets: 3, reps: "30-40", restTime: "30 sec", video: "c4DAnQ6DtF8" },
    ],
  },
  {
    id: "home-2",
    title: "Advanced Home Workout",
    description: "A challenging home workout for advanced fitness enthusiasts.",
    level: "Advanced",
    duration: "45 mins",
    target: "Home Workout",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
    exercises: [
      { name: "Pistol Squats", sets: 3, reps: "8-10 each leg", restTime: "90 sec", video: "1-A0gJm9H1s" },
      { name: "Handstand Push-ups", sets: 3, reps: "5-8", restTime: "90 sec", video: "z6PJMT2y8GQ" },
      { name: "Burpees", sets: 3, reps: "10-15", restTime: "60 sec", video: "TU8QYVW0gDU" },
      { name: "Mountain Climbers", sets: 3, reps: "30-40", restTime: "30 sec", video: "nmwgirgXLYM" },
    ],
  },
];

export function useWorkouts() {
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const filteredWorkouts = workouts.filter((workout) => {
    // Filter by level (Beginner, Intermediate, Advanced)
    if (
      currentCategory !== "all" &&
      currentCategory !== "chest" &&
      currentCategory !== "arms" &&
      currentCategory !== "back" &&
      currentCategory !== "legs" &&
      currentCategory !== "core" &&
      currentCategory !== "home workout" &&
      workout.level.toLowerCase() !== currentCategory.toLowerCase()
    ) {
      return false;
    }

    // Filter by target (Chest, Arms, etc.)
    if (
      ["chest", "arms", "back", "legs", "core", "home workout"].includes(currentCategory) &&
      workout.target.toLowerCase() !== currentCategory.toLowerCase()
    ) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !workout.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !workout.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return {
    workouts: filteredWorkouts,
    currentCategory,
    searchQuery,
    selectedWorkout,
    setCurrentCategory,
    setSearchQuery,
    setSelectedWorkout,
  };
}
