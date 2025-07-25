import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { Link } from "wouter";
import { useUserData } from "../../hooks/useUserData";

export const UserProfileCard = () => {
  const { getUserInitials, getUserDisplayName, getUserType } = useUserData();

  return (
    <Card className="bg-gray-900 border border-gray-800 w-full">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            {getUserInitials()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white">
          {getUserDisplayName()}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {getUserType()}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-gray-700 hover:bg-[#bb00aa] hover:text-white transition-colors"
          asChild
        >
          <Link href="/user/profile">
            <Edit3 className="h-4 w-4 mr-2 text-white" /> Ver Perfil
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
