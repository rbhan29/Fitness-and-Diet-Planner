
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface PreviewCardProps {
  image: string;
  title: string;
  description: string;
  metadata: {
    label: string;
    value: string;
  };
  action: {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
  };
}

export const PreviewCard = ({ 
  image, 
  title, 
  description, 
  metadata, 
  action 
}: PreviewCardProps) => {
  const ActionIcon = action.icon;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover-scale">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-xl">{title}</h3>
          <span className="bg-muted text-xs font-medium px-2 py-1 rounded">
            {metadata.value}
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{metadata.label}</span>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={action.onClick}
          >
            <ActionIcon className="h-4 w-4" /> {action.label}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
