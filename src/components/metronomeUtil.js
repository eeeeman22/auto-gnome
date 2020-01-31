import metronomeClick from '../sounds/metronome1.flac';
import BufferLoader from './BufferLoader.js';
window.AudioContext = window.AudioContext || window.webkitAudioContext;

let timeContext = new AudioContext();
let buffer;

const finishedLoading = bufferList => {
  buffer = bufferList[0];
};

const sound = async () => {
  if (buffer === undefined) {
    let bufferLoader = new BufferLoader(
      timeContext,
      [metronomeClick],
      finishedLoading
    );
    bufferLoader.load();
  }
};

let ended = 0;
let queue = [];
let setIntervalCancel;

const play = (tempo, goal, incrementBy, incrementEvery) => {
  timeContext = new AudioContext();
  sound();
  let rawTempo = tempo;
  let calculatedTempo = 60 / rawTempo;
  let currentTime = timeContext.currentTime + 0.2;
  let incrementCompletion = 0;
  setIntervalCancel = setInterval(() => {
    // clear out old gnomes from queue to save memory
    for (let i = 0; i < ended; i++) {
      queue.shift();
    }
    ended = 0;

    if (queue.length < 21) {
      for (let i = 1; i < 21; i++) {
        // update tempo if incrementing
        if (incrementBy && incrementEvery && rawTempo < goal) {
          if (incrementCompletion > incrementEvery) {
            incrementCompletion = 0;
            rawTempo += incrementBy;
            if (rawTempo > goal) {
              rawTempo = goal;
            }
            calculatedTempo = 60 / rawTempo;
          }
        }

        // generate audio and push to queue
        let source = timeContext.createBufferSource();
        source.buffer = buffer;
        source.connect(timeContext.destination);

        // callback adds one more click to the list of elements to delete
        // eslint-disable-next-line
        source.onended = () => {
          ended += 1;
        };

        // gotta push the clock ahead so that it doesn't just duplicate events
        incrementCompletion += calculatedTempo;
        currentTime += calculatedTempo;
        // initiate sound and push to a place we can reference it
        source.start(currentTime + calculatedTempo);
        queue.push(source);
      }
    }
  }, 200);
};

const cancel = () => {
  if (setIntervalCancel) {
    clearInterval(setIntervalCancel);
    for (let node in queue) {
      queue[node].stop();
    }
    queue = [];
  }
};

export { play, cancel };
