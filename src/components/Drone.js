window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let pitches = [
  440,
  466.16,
  493.88,
  523.25,
  554.37,
  587.33,
  622.25,
  659.25,
  698.46,
  739.99,
  793.99,
  830.61
];

let sounds = [];
const makeSound = pitch => {
  let freq = pitches[pitch - 1];
  console.log(freq);
  if (!sounds[0]) {
    let oscillator = context.createOscillator();
    let gain = context.createGain();

    sounds.push(oscillator);
    sounds.push(gain);

    oscillator.type = 'sine';

    oscillator.frequency.value = freq;

    oscillator.connect(gain);
    gain.connect(context.destination);

    // gain.start();
    oscillator.start();

    console.log(oscillator);
    return pitch;
  }
};

const stopSound = () => {
  console.log(sounds);
  for (let sound in sounds) {
    if (sound % 2 === 0) {
      sounds[sound].stop();
    }
  }
  sounds = [];

  console.log('stopSound');
};
export { makeSound, stopSound };
