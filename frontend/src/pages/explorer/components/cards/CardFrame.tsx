import React from 'react';
import { mockArtists } from '../../data/mockData';
import { Artist } from '../../types';
import { ContentCard } from '../ContentCard';

const CardFrame: React.FC = () => {
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
        } as Artist}
        activeTab="artists"
        onTabChange={() => {}}
      />
    </div>
  );
};

export default CardFrame;