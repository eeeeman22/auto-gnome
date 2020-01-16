import React, { useEffect, useState } from 'react';
import metronomeClick from '../sounds/metronome1.flac';
import { Sound, play, stop } from './Sound';

class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 60,
      playing: false
    };
  }

  changeTempo(tempo) {
    if (tempo === '') {
      this.setState({ tempo: 0 });
    }
    if (Number(tempo)) {
      this.setState({ tempo: tempo });
      // this.start();
    }
  }

  start(tempo) {
    play(tempo);
  }
  stopMetronome() {
    stop();
  }

  async componentDidMount() {
    Sound();
  }

  render() {
    return (
      <div>
        Tempo:
        <input
          type="text"
          value={this.state.tempo}
          onChange={e => {
            this.changeTempo(e.target.value);
          }}
        ></input>
        <button onClick={() => this.start(this.state.tempo)}>Play</button>
        <button onClick={() => this.stopMetronome()}>Stop</button>
        {/* <audio id="gnome" src={metronomeClick}></audio> */}
      </div>
    );
  }
}

export default Metronome;
