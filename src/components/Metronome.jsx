import React, { useEffect, useState } from 'react';
import metronomeClick from '../sounds/metronome1.flac';
import { Sound, play, cancel } from './Sound';

class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 60,
      playing: false,
      goal: 60,
      incrementBy: 0,
      incrementEvery: 0
    };
  }

  changeTempo(tempo) {
    if (tempo === '') {
      this.setState({ tempo: 0 });
    }
    if (Number(tempo)) {
      this.setState({ tempo: tempo });
    }
  }
  changePlaying() {
    this.setState({ playing: !this.state.playing });
  }
  changeGoal(newGoalTempo) {
    if (newGoalTempo === '') {
      this.setState({ goal: 0 });
    } else {
      this.setState({ goal: newGoalTempo });
    }
  }
  changeIncrementBy(newIncrement) {
    if (newIncrement === '') {
      this.setState({ incrementBy: 0 });
    } else {
      this.setState({ incrementBy: newIncrement });
    }
  }
  changeIncrementEvery(newIncrementEvery) {
    if (newIncrementEvery === '') {
      this.setState({ incrementEvery: 0 });
    } else {
      this.setState({ incrementEvery: newIncrementEvery });
    }
  }

  start() {
    let { tempo, goal, incrementBy, incrementEvery } = this.state;
    play(
      Number(tempo),
      Number(goal),
      Number(incrementBy),
      Number(incrementEvery)
    );
  }
  stopMetronome() {
    cancel();
  }
  incrementBy10() {
    this.stopMetronome();
    this.setState({ tempo: this.state.tempo + 10 });
    this.start();
  }
  decrementBy10() {
    this.stopMetronome();
    this.setState({ tempo: this.state.tempo - 10 });
    this.start();
  }

  async componentDidMount() {
    Sound();
  }

  render() {
    return (
      <div className="module">
        <div className="background">
          <h2>Metronome</h2>
          <ul className="moduleContents">
            <div className="moduleElement">
              Starting Tempo:
              <input
                type="text"
                value={this.state.tempo}
                onChange={e => {
                  this.changeTempo(e.target.value);
                }}
              ></input>
            </div>
            <div className="moduleElement">
              Goal Tempo:
              <input
                type="text"
                value={this.state.goal}
                onChange={e => {
                  this.changeGoal(e.target.value);
                }}
              ></input>
            </div>
            <div className="moduleElement">
              Increment by
              <input
                type="text"
                value={this.state.incrementBy}
                onChange={e => {
                  this.changeIncrementBy(e.target.value);
                }}
              ></input>
            </div>
            <div className="moduleElement">
              Every
              <input
                type="text"
                value={this.state.incrementEvery}
                onChange={e => {
                  this.changeIncrementEvery(e.target.value);
                }}
              ></input>
            </div>
          </ul>
          <ul>
            <div className="moduleElement">
              <button
                className="moduleButton"
                onClick={() => this.incrementBy10()}
              >
                +10bpm
              </button>
            </div>
            <div className="moduleElement">
              <button
                className="moduleButton"
                onClick={() => this.decrementBy10()}
              >
                -10bpm
              </button>
            </div>
            <button
              className="playMetronome"
              onClick={() => this.start(this.state.tempo)}
            >
              Play
            </button>
            <button
              className="stopMetronome"
              onClick={() => this.stopMetronome()}
            >
              Stop
            </button>
          </ul>
        </div>
      </div>
    );
  }
}

export default Metronome;
