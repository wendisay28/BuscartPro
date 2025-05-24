import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Music, 
  Drama, 
  PaintbrushVertical, 
  Camera, 
  BookOpen, 
  Video, 
  Sparkles,
  Users
} from "lucide-react";
import { Link } from "wouter";

const categoryIcons: Record<string, any> = {
  "Música": Music,
  "Teatro": Drama,
  "Artes Visuales": PaintbrushVertical,
  "Fotografía": Camera,
  "Literatura": BookOpen,
  "Audiovisual": Video,
  "Danza": Users,
  "Circo": Sparkles,
};

const gradients = [
  "from-primary to-secondary",
  "from-secondary to-accent", 
  "from-accent to-primary",
  "from-primary to-secondary",
  "from-secondary to-accent",
  "from-accent to-primary",
  "from-primary to-secondary",
  "from-secondary to-accent",
];

export default function QuickCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-semibold text-2xl text-dark mb-8 text-center">
            Explora por Categoría
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex flex-col items-center p-4 rounded-xl">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-semibold text-2xl text-dark mb-8 text-center">
          Explora por Categoría
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories && categories.length > 0 ? (
            categories.map((category: any, index: number) => {
              const IconComponent = categoryIcons[category.name] || Music;
              const gradient = gradients[index % gradients.length];
              
              return (
                <Link
                  key={category.id}
                  href={`/explorer?categoryId=${category.id}&type=artists`}
                  className="group"
                >
                  <Card className="group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="text-white h-8 w-8" />
                      </div>
                      <h3 className="font-medium text-gray-700 text-sm group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          ) : (
            // Fallback static categories if API fails
            [
              { name: "Música", icon: Music },
              { name: "Teatro", icon: Drama },
              { name: "Artes Visuales", icon: PaintbrushVertical },
              { name: "Fotografía", icon: Camera },
              { name: "Danza", icon: Users },
              { name: "Literatura", icon: BookOpen },
              { name: "Audiovisual", icon: Video },
              { name: "Más", icon: Sparkles },
            ].map((category, index) => {
              const IconComponent = category.icon;
              const gradient = gradients[index % gradients.length];
              
              return (
                <Link
                  key={category.name}
                  href={`/explorer?search=${category.name}&type=artists`}
                  className="group"
                >
                  <Card className="group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="text-white h-8 w-8" />
                      </div>
                      <h3 className="font-medium text-gray-700 text-sm group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
