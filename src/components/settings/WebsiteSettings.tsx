import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const WebsiteSettings = () => {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    activityDigest: true,
  });

  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

  const handleSave = () => {
    toast.success("Website settings updated!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Preferences</CardTitle>
        <CardDescription>
          Customize your website experience and notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme" className="flex flex-col">
              <span>Dark Mode</span>
              <span className="text-sm text-muted-foreground">
                Toggle between light and dark theme
              </span>
            </Label>
            <Switch
              id="theme"
              checked={theme === "dark"}
              onCheckedChange={(checked) => {
                const newTheme = checked ? "dark" : "light";
                setTheme(newTheme);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifs" className="flex flex-col">
              <span>Email Notifications</span>
              <span className="text-sm text-muted-foreground">
                Receive email updates about your activity
              </span>
            </Label>
            <Switch
              id="emailNotifs"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, emailNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="marketingEmails" className="flex flex-col">
              <span>Marketing Emails</span>
              <span className="text-sm text-muted-foreground">
                Receive emails about new features and promotions
              </span>
            </Label>
            <Switch
              id="marketingEmails"
              checked={settings.marketingEmails}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, marketingEmails: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="activityDigest" className="flex flex-col">
              <span>Activity Digest</span>
              <span className="text-sm text-muted-foreground">
                Get weekly summary of your activities
              </span>
            </Label>
            <Switch
              id="activityDigest"
              checked={settings.activityDigest}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, activityDigest: checked }))
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
