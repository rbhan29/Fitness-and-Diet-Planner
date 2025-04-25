
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BellRing } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Workout Available",
      description: "Check out our latest HIIT workout program!",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Goal Achievement",
      description: "Congratulations! You've completed your weekly goal.",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Community Update",
      description: "Your post received 5 new likes",
      time: "2 days ago"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 p-4 bg-gradient-texture rounded-lg shadow-lg animate-float">
        <BellRing className="h-6 w-6 text-white" />
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
      </div>
      
      <Card className="relative overflow-hidden border-none bg-card-texture bg-[size:20px_20px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Recent Notifications
          </CardTitle>
          <CardDescription>Stay updated with your latest activities</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <Card 
                  key={notification.id}
                  className="transform transition-all duration-300 hover:scale-102 hover:shadow-lg backdrop-blur-sm bg-white/10"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'slide-up 0.5s ease-out forwards'
                  }}
                >
                  <CardContent className="p-4 relative overflow-hidden">
                    <div className="space-y-1">
                      <h3 className="font-medium text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground opacity-75">
                        {notification.time}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-texture opacity-10 rounded-full blur-2xl animate-pulse-slow" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
