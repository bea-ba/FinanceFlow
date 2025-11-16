import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Moon, Sun, Monitor } from "lucide-react";
import { toast } from "sonner";

type Theme = "light" | "dark" | "system";

export const ThemeSettings = () => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" />
          Theme Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={theme} onValueChange={(value) => handleThemeChange(value as Theme)}>
          <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light" className="flex items-center gap-3 flex-1 cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
                <Sun className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="space-y-0.5">
                <p className="font-medium">Light Mode</p>
                <p className="text-sm text-muted-foreground">
                  Bright and clear interface
                </p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark" className="flex items-center gap-3 flex-1 cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800">
                <Moon className="h-5 w-5 text-slate-200" />
              </div>
              <div className="space-y-0.5">
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Easy on the eyes in low light
                </p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system" className="flex items-center gap-3 flex-1 cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-slate-800">
                <Monitor className="h-5 w-5 text-foreground" />
              </div>
              <div className="space-y-0.5">
                <p className="font-medium">System Default</p>
                <p className="text-sm text-muted-foreground">
                  Follow my device settings
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
