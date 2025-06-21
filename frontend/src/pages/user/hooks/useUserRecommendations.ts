import { useState } from "react";
import { recommendationsMock } from "../data/recommendations.mock";

export function useUserRecommendations() {
  const [recommendations, setRecommendations] = useState(recommendationsMock);
  const userId = "me"; // simula ID del usuario autenticado

  const handleLike = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, likes: rec.likes + 1 } : rec
      )
    );
  };

  const handleDelete = (id: string) => {
    setRecommendations((prev) => prev.filter((rec) => rec.id !== id));
  };

  return {
    recommendations,
    userId,
    handleLike,
    handleDelete,
  };
}
