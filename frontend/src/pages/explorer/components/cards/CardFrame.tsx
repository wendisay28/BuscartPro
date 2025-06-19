import React from "react";
import { ContentCard } from "@/pages/explorer/components/ContentCard";
import { mockArtists } from "../../data/mockData";

const CardFrame: React.FC = () => {
  // Use the first artist as mock data
  const artist = mockArtists[0];
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <ContentCard 
        type="artist"
        data={{
          ...artist,
          stats: artist.stats || {
            responseTime: '',
            projectsCompleted: 0,
            languages: []
          }
        }}
      />
    </div>
  );
};

export default CardFrame;
