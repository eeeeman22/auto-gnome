import metronomeClick from '../sounds/metronome1.flac';
import BufferLoader from './BufferLoader.js';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let buffer;

const finishedLoading = bufferList => {
  buffer = bufferList[0];
};

const Sound = async (numOfReps = 1) => {
  if (buffer === undefined) {
    let bufferLoader = new BufferLoader(
      context,
      [metronomeClick],
      finishedLoading
    );
    bufferLoader.load();
  }
};

const queue = [];
// console.log(bufferLoader);
// for (let i = 0; i < numOfReps; i++) {}
let cancel;
const play = tempo => {
  console.log(tempo);
  let calculatedTempo = (60 / tempo) * 1000;
  console.log(calculatedTempo);
  // let initSource = context.createBufferSource();
  // initSource.buffer = buffer;
  // initSource.connect(context.destination);
  // console.log(initSource);
  // initSource.start(context.currentTime);
  cancel = setInterval(() => {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    console.log(source);
    source.start(context.currentTime);
  }, calculatedTempo);
};

const stop = () => {
  clearInterval(cancel);
};

export { Sound, play, stop };
