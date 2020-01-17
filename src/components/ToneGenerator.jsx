import React, { useState, useEffect } from 'react';
import './ToneGenerator.css';
import { makeSound, stopSound } from './Drone.js';

const ToneGenerator = () => {
  const [pitch, setPitch] = useState(1);
  let [isPlaying, setIsPlaying] = useState(false);
  // useEffect(() => {}, [pitch]);

  const changePitch = pitch => {
    setPitch(pitch);
    if (isPlaying) {
      cancelSound();
      startSound(pitch);
    }
  };
  const startSound = pitch => {
    makeSound(pitch);
    setIsPlaying(true);
  };
  const cancelSound = () => {
    stopSound();
    setIsPlaying(false);
  };

  let pitchName = pitch => {
    let names = [
      'A',
      'Bb',
      'B',
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#'
    ];
    return names[pitch - 1];
  };

  return (
    <div className="module">
      <div className="background">
        <h2>Pitch: {pitchName(pitch)}</h2>
        <ul className="moduleContents">
          <div className="moduleElement">
            <input
              className="pitchSlider"
              type="range"
              min="1"
              max="12"
              value={pitch}
              onChange={e => changePitch(e.target.value)}
            ></input>
          </div>
          <div className="moduleElement">
            <button
              className="moduleButton"
              onClick={() => {
                startSound(pitch);
              }}
            >
              Start
            </button>
          </div>
          <div className="moduleElement">
            <button className="moduleButton" onClick={() => cancelSound()}>
              Stop
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ToneGenerator;
