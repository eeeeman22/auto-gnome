import React, { useState } from 'react';
import { Sound, play, cancel } from './metronomeUtil.js';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const timeContext = new AudioContext();
Sound();
let gnomes = [];

const runGnomes = practiceStack => {
  console.log(practiceStack[0]);
  if (Array.isArray(practiceStack) && practiceStack.length > 0) {
    console.log(practiceStack);
    const { tempo, goal, incrementBy, incrementEvery } = practiceStack[0];
    let currentTime = timeContext.currentTime + 0.2;
    let source = timeContext.createOscillator();
    let gain = timeContext.createGain();
    gain.gain.value = 0;
    source.connect(gain);
    gain.connect(timeContext.destination);
    gain.gain.value = 0.01;
    console.log(source);

    source.onended = () => {
      play(tempo, goal, incrementBy, incrementEvery);
      cancelGnomeAndAdvance(practiceStack, practiceStack[0].howLong);
    };
    source.start(currentTime);
    console.log(source);
    source.stop(currentTime + 0.1);
  }
};
const cancelGnomeAndAdvance = (practiceStack, delay) => {
  if (practiceStack.length >= 1) {
    let currentTime = timeContext.currentTime + 0.2;
    let source = timeContext.createOscillator();
    let gain = timeContext.createGain();
    gain.gain.value = 0;
    source.connect(gain);
    gain.connect(timeContext.destination);
    console.log('ON END ');
    source.onended = () => {
      console.log('here');
      cancel();
      runGnomes(practiceStack.slice(1));
    };
    source.start();
    source.stop(delay);
  }
};

const AutoGnome = ({ practiceStack }) => {
  return (
    <div>
      <button className="runGnomes" onClick={() => runGnomes(practiceStack)}>
        Run Gnomes
      </button>
      <button className="stopGnomes" onClick={() => cancel()}>
        STOP
      </button>
    </div>
  );
};

export default AutoGnome;
