import React from 'react';

const Episode = ({ eachEpisode }) => {
  
  return (
    <div>
      Episode {eachEpisode.number} - {eachEpisode.name}
    </div>
  )
}

export default Episode;
