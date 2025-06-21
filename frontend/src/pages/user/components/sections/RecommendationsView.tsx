import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecommendationCard } from "@/components/recommendation/RecommendationCard";
import { useUserRecommendations } from "../../hooks/useUserRecommendations";

type Props = {
  onCreate: () => void;
};

export function RecommendationsView({ onCreate }: Props) {
  const { recommendations, handleLike, handleDelete, userId } = useUserRecommendations();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mis Recomendaciones</CardTitle>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={onCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Recomendación
          </Button>
        </CardHeader>
        <CardContent>
          {recommendations.filter(rec => rec.user.id === userId).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Aún no has publicado ninguna recomendación</p>
              <Button onClick={onCreate} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Crear mi primera recomendación
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.filter(rec => rec.user.id === userId).map((rec) => {
                const recommendation = {
                  ...rec,
                  description: rec.content,
                  category: 'General',
                  comments: 0,
                  isOwner: true,
                  onDelete: handleDelete,
                  onLike: handleLike,
                  onComment: () => {}
                };
                return <RecommendationCard key={rec.id} {...recommendation} />;
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones de la comunidad</CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.filter(rec => rec.user.id !== userId).length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay recomendaciones disponibles en este momento
            </p>
          ) : (
            <div className="space-y-4">
              {recommendations.filter(rec => rec.user.id !== userId).map((rec) => {
                const recommendation = {
                  ...rec,
                  description: rec.content,
                  category: 'General',
                  comments: 0,
                  isOwner: false,
                  onDelete: handleDelete,
                  onLike: handleLike,
                  onComment: () => {}
                };
                return <RecommendationCard key={rec.id} {...recommendation} />;
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
