
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    progressUpdates: true,
    newWorkouts: false,
    communityUpdates: true,
  });

  const handleSave = () => {
    toast.success("Notification preferences updated!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="workoutReminders" className="flex flex-col">
              <span>Workout Reminders</span>
              <span className="text-sm text-muted-foreground">
                Get reminded about your scheduled workouts
              </span>
            </Label>
            <Switch
              id="workoutReminders"
              checked={notifications.workoutReminders}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, workoutReminders: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="progressUpdates" className="flex flex-col">
              <span>Progress Updates</span>
              <span className="text-sm text-muted-foreground">
                Receive updates about your fitness progress
              </span>
            </Label>
            <Switch
              id="progressUpdates"
              checked={notifications.progressUpdates}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, progressUpdates: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="newWorkouts" className="flex flex-col">
              <span>New Workouts</span>
              <span className="text-sm text-muted-foreground">
                Get notified about new workout programs
              </span>
            </Label>
            <Switch
              id="newWorkouts"
              checked={notifications.newWorkouts}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, newWorkouts: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="communityUpdates" className="flex flex-col">
              <span>Community Updates</span>
              <span className="text-sm text-muted-foreground">
                Stay informed about community activities
              </span>
            </Label>
            <Switch
              id="communityUpdates"
              checked={notifications.communityUpdates}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, communityUpdates: checked }))
              }
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
