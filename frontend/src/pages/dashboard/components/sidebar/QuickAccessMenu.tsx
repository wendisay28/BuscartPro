import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Bookmark, 
  Users, 
  BookOpen, 
  Store, 
  Calendar, 
  Star 
} from "lucide-react";

export const QuickAccessMenu = () => {
  const quickLinks = [
    { icon: Bookmark, label: "Guardados", href: "/user/favorites" },
    { icon: Users, label: "Grupos", href: "/community/groups" },
    { icon: BookOpen, label: "Blog", href: "/community/blog" },
    { icon: Store, label: "Tienda", href: "/marketplace" },
    { icon: Calendar, label: "Eventos", href: "/explorer/events" },
    { icon: Star, label: "Suscripciones", href: "/user/subscriptions" },
  ];

  return (
    <Card className="bg-gray-900 border border-gray-800 w-full">
      <CardHeader>
        <CardTitle className="text-lg text-white">Accesos Rápidos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {quickLinks.map(({ icon: Icon, label, href }, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="w-full justify-start text-left text-gray-300 hover:bg-[#bb00aa] hover:text-white"
            asChild
          >
            <Link href={href}>
              <Icon className="h-4 w-4 mr-3 text-white" />
              <span>{label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
