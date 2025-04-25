
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WorkoutFiltersProps {
  searchQuery: string;
  currentCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const WorkoutFilters = ({ 
  searchQuery, 
  currentCategory, 
  onSearchChange, 
  onCategoryChange 
}: WorkoutFiltersProps) => {
  return (
    <>
      <section className="bg-muted py-6 px-4 border-b">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search workouts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Filter:</span>
              <Button
                variant={currentCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange("all")}
              >
                All
              </Button>
              <Button
                variant={currentCategory === "beginner" ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange("beginner")}
              >
                Beginner
              </Button>
              <Button
                variant={currentCategory === "intermediate" ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange("intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant={currentCategory === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange("advanced")}
              >
                Advanced
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="chest" className="mb-8">
        <TabsList className="w-full grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="chest" onClick={() => onCategoryChange("chest")}>Chest</TabsTrigger>
          <TabsTrigger value="arms" onClick={() => onCategoryChange("arms")}>Arms</TabsTrigger>
          <TabsTrigger value="back" onClick={() => onCategoryChange("back")}>Back</TabsTrigger>
          <TabsTrigger value="legs" onClick={() => onCategoryChange("legs")}>Legs</TabsTrigger>
          <TabsTrigger value="core" onClick={() => onCategoryChange("core")}>Core</TabsTrigger>
          <TabsTrigger value="home workout" onClick={() => onCategoryChange("home workout")}>Home Workout</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default WorkoutFilters;
