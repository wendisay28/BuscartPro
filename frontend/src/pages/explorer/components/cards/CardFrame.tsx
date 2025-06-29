import React from "react";
import { ContentCard } from "@/pages/explorer/components/ContentCard";
import { mockArtists } from "../../data/mockData";
import { Artist } from "@/pages/explorer/types";

const CardFrame: React.FC = () => {
  // Use the first artist as mock data
  const artist = mockArtists[0];
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <ContentCard 
        data={{
          ...artist,
          type: 'artist',
          stats: artist.stats || {
            responseTime: '',
            projectsCompleted: 0,
            languages: []
          }
        } as Artist}
      />
    </div>
  );
};

export default CardFrame;
