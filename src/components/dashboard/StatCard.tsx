
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  change: number;
  className?: string;
}

export const StatCard = ({ title, value, label, change, className }: StatCardProps) => {
  const isPositive = change >= 0;
  const changeDisplay = isPositive ? `+${change}` : `${change}`;

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{changeDisplay}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
