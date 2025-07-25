import { Card } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import type { Profile } from "@/types/profile";

interface ProfileCardProps {
  profile: Profile;
  onClick: () => void;
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const formatPrice = (price: number | undefined, unit: string) => {
    if (price === undefined) return 'Precio no disponible';
    return `$${price.toLocaleString()} COP/${unit}`;
  };

  const renderStars = (rating: number | string) => {
    // Convert string rating to number if needed
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} size={12} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card 
      className="profile-card hover:shadow-lg transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex space-x-4">
        <img 
          src={profile.imageUrl} 
          alt={profile.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">
            {profile.category} • {profile.services.slice(0, 2).join(", ")}
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <MapPin size={12} className="mr-1" />
            {profile.neighborhood}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <div className="rating-stars">
                {renderStars(profile.rating)}
              </div>
              <span className="text-sm text-muted-foreground">{profile.rating}</span>
            </div>
            <span className="price-display">
              {formatPrice(profile.basePrice || profile.price, profile.priceUnit)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
