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

let ended = 0;
let queue = [];
let setIntervalCancel;
let lengthOfBeats = [];

const play = (tempo, goal, incrementBy, incrementEvery) => {
  let timeContext = new AudioContext();
  let rawTempo = tempo;
  let calculatedTempo = 60 / rawTempo;
  // default to 20minutes

  let currentTime = timeContext.currentTime + 0.2;
  let incrementCompletion = 0;
  setIntervalCancel = setInterval(() => {
    console.log('QUEUE LEN', queue.length);
    // clear out old gnomes from queue to save memory
    for (let i = 0; i < ended; i++) {
      queue.shift();
    }
    ended = 0;
    // console.log('QUEUE LEN:', queue.length);

    if (queue.length < 21) {
      for (let i = 1; i < 21; i++) {
        // console.log('RAWTEMPO', rawTempo);
        // console.log('calculated tempo:', calculatedTempo);
        // update tempo if incrementing
        if (incrementBy && incrementEvery && rawTempo < goal) {
          if (incrementCompletion > incrementEvery) {
            incrementCompletion = 0;
            rawTempo += incrementBy;
            if (rawTempo > goal) {
              rawTempo = goal;
            }
            calculatedTempo = 60 / rawTempo;
            console.log('INCREMENTING. NEW TEMPO:', calculatedTempo);
          }
        }
        // generate audio and push to queue
        // let context = new AudioContext();
        let source = timeContext.createBufferSource();
        source.buffer = buffer;
        source.connect(timeContext.destination);
        source.onended = () => {
          console.log('playing');
          ended += 1;
        };

        incrementCompletion += calculatedTempo;
        console.log('written up to', currentTime + calculatedTempo);
        source.start(currentTime + calculatedTempo);
        queue.push(source);
        currentTime += calculatedTempo;
        // lengthOfBeats.push(calculatedTempo);
      }
      // gotta push the clock ahead so that it doesn't just duplicate events
      // let extraTime = lengthOfBeats.reduce((acc, curr) => {
      //   return acc + curr;
      // });
      // console.log('Extra time', extraTime);
      // currentTime += extraTime;

      // console.log('IN QUEUE', queue.length);
    }
  }, 200);
};

const cancel = () => {
  clearInterval(setIntervalCancel);
  for (let node in queue) {
    queue[node].stop();
  }
  // console.log(queue);
};

export { Sound, play, cancel };
