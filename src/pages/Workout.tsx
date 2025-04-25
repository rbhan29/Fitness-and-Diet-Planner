
import WorkoutCard from "@/components/workout/WorkoutCard";
import WorkoutDetail from "@/components/workout/WorkoutDetail";
import WorkoutFilters from "@/components/workout/WorkoutFilters";
import { useWorkouts } from "@/hooks/use-workouts";

const WorkoutPage = () => {
  const {
    workouts,
    currentCategory,
    searchQuery,
    selectedWorkout,
    setCurrentCategory,
    setSearchQuery,
    setSelectedWorkout,
  } = useWorkouts();

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-fitness-primary to-fitness-accent text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Workout Library</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Explore our collection of professionally designed workouts for every body part and fitness level
          </p>
        </div>
      </section>
      
      {/* Filters */}
      <WorkoutFilters 
        searchQuery={searchQuery}
        currentCategory={currentCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setCurrentCategory}
      />
      
      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {selectedWorkout ? (
            <WorkoutDetail 
              workout={selectedWorkout} 
              onBack={() => setSelectedWorkout(null)} 
            />
          ) : (
            <>
              {workouts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No workouts found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {workouts.map((workout) => (
                    <WorkoutCard 
                      key={workout.id} 
                      workout={workout} 
                      onClick={() => setSelectedWorkout(workout)} 
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkoutPage;
