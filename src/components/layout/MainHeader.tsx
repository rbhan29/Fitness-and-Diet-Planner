
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Bell, Menu, Search, User } from "lucide-react";
import { ColorSwitch } from "@/components/theme/ColorSwitch";

interface MainHeaderProps {
  onMenuToggle: () => void;
}

const MainHeader = ({ onMenuToggle }: MainHeaderProps) => {
  const { theme } = useTheme();
  
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 border-b bg-background/80 backdrop-blur-sm border-border transition-all duration-300 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden hover:bg-accent btn-hover animate-float" 
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center">
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-pulse-slow">
            FitVerse
          </span>
        </div>
        <div className="hidden md:flex relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-full bg-muted/50 border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all hover:bg-muted/70"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ColorSwitch />
        <Button variant="ghost" size="icon" className="btn-hover relative animate-float">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
        </Button>
        <Button variant="ghost" size="icon" className="btn-hover animate-float">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;
