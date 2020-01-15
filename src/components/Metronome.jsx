import React, { useEffect, useState } from 'react';

const Metronome = () => {
  const [tempo, setTempo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //   const

  return (
    <div className="module">
      Metronome component
      <audio autoPlay>
        <source src="sounds/metronome1.flac" type="audio/flac" />
      </audio>
    </div>
  );
};

export default Metronome;
