import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, MessageCircle, Star, MapPin } from "lucide-react";
import type { Profile, Review } from "@/types/profile";

interface ProfileDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: number | null;
}

export function ProfileDetailModal({ isOpen, onClose, profileId }: ProfileDetailModalProps) {
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profiles", profileId],
    queryFn: async () => {
      const response = await fetch(`/api/profiles/${profileId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    },
    enabled: !!profileId && isOpen,
  });

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/profiles", profileId, "reviews"],
    queryFn: async () => {
      const response = await fetch(`/api/profiles/${profileId}/reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return response.json();
    },
    enabled: !!profileId && isOpen,
  });

  if (!profileId || !isOpen) return null;

  const formatPrice = (price: number, unit: string) => {
    return `$${price.toLocaleString()} COP/${unit}`;
  };

  const renderStars = (rating: number | string) => {
    // Convert string rating to number if needed
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    // Ensure we have a valid number
    if (isNaN(numericRating)) return null;
    
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }
    return stars;
  };

  if (profileLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white"
            >
              <X size={16} />
            </Button>
            <img 
              src={profile.imageUrl} 
              alt={profile.name}
              className="w-full h-full object-cover rounded-t-lg opacity-80"
            />
          </div>
          
          {/* Profile Content */}
          <div className="p-6 -mt-16 relative">
            <div className="flex items-end space-x-4 mb-6">
              <img 
                src={profile.imageUrl} 
                alt={profile.name}
                className="w-24 h-24 rounded-2xl border-4 border-background shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                <p className="text-lg text-muted-foreground">{profile.category}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {renderStars(profile.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {profile.rating} ({profile.reviewCount} reseñas)
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-primary">
                    {formatPrice(profile.price, profile.priceUnit)}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <div className="flex items-center text-muted-foreground">
                <MapPin size={16} className="mr-2" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Services */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Servicios</h3>
              <div className="flex flex-wrap gap-2">
                {profile.services.map((service: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">
                {profile.about}
              </p>
            </div>

            {/* Recent Reviews */}
            {reviews.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Reseñas Recientes</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="bg-muted rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {review.author}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Calendar className="mr-2" size={16} />
                Reservar Ahora
              </Button>
              <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <MessageCircle className="mr-2" size={16} />
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
