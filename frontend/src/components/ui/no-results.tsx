import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface NoResultsProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
}

export function NoResults({
  icon = <Users className="h-12 w-12 text-gray-400" />,
  title,
  description,
  buttonText,
  onAction
}: NoResultsProps) {
  return (
    <Card className="text-center py-12">
      <CardContent className="p-12">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-heading font-semibold text-xl text-dark mb-4">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        <Button onClick={onAction}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
