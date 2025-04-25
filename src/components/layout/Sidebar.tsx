
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Bell, 
  Home, 
  Dumbbell, 
  Calendar, 
  Users,
  Settings, 
  Moon, 
  Sun, 
  LogOut 
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { currentUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) && 
        open
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  // Prevent scrolling when sidebar is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleLogout = () => {
    logout();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-card transition-transform duration-300 transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:relative md:z-10`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{currentUser?.fullName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            <SidebarLink href="/home" icon={<Home size={20} />} label="Home" />
            <SidebarLink href="/workout" icon={<Dumbbell size={20} />} label="Workouts" />
            <SidebarLink href="/diet" icon={<Calendar size={20} />} label="Diet Planner" />
            <SidebarLink href="/community" icon={<Users size={20} />} label="Community" />

            <div className="pt-4 mt-4 border-t border-border">
              <SidebarLink href="/notifications" icon={<Bell size={20} />} label="Notifications" />
              <SidebarLink href="/settings" icon={<Settings size={20} />} label="Settings" />
            </div>
          </nav>

          <div className="border-t border-border pt-4 space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <><Sun size={20} className="mr-2" /> Light Mode</>
              ) : (
                <><Moon size={20} className="mr-2" /> Dark Mode</>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive" 
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink = ({ href, icon, label }: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
    >
      <span className="mr-3 text-muted-foreground">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default Sidebar;
