
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useColorScheme } from "@/context/ColorSchemeContext";

const schemes = [
  { name: "Default", value: "default" },
  { name: "Nature", value: "nature" },
  { name: "Ocean", value: "ocean" },
  { name: "Sunset", value: "sunset" },
] as const;

export function ColorSwitch() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="btn-hover">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle color scheme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {schemes.map((scheme) => (
          <DropdownMenuItem
            key={scheme.value}
            onClick={() => setColorScheme(scheme.value)}
            className={colorScheme === scheme.value ? "bg-accent" : ""}
          >
            {scheme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
