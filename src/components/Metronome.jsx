import React, { useEffect, useState } from 'react';
import metronomeClick from '../sounds/metronome1.flac';
import { Sound, play, cancel } from './metronomeUtil.js';

class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: this.props.tempo || 60,
      autoPlay: this.props.autoPlay || false,
      goal: this.props.goal || 60,
      incrementBy: this.props.incrementBy || 0,
      incrementEvery: this.props.incrementEvery || 0,
      hidden: this.props.hidden || false,
      howLong: this.props.howLong || 10
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
  changeHowLong(howLong) {
    if (howLong === '') {
      this.setState({ howLong: 0 });
    } else {
      this.setState({ howLong: howLong });
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
    if (this.state.autoPlay) {
      this.start();
    }
    console.log(this.props.passedProp);
  }

  render() {
    if (!this.state.hidden) {
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
              <div className="moduleElement">
                HowLong?
                <input
                  type="text"
                  value={this.state.howLong}
                  onChange={e => {
                    this.changeHowLong(e.target.value);
                  }}
                ></input>
              </div>
            </ul>
            <ul>
              <div className="moduleElement">
                <button
                  className="moduleButton"
                  onClick={() =>
                    this.props.addToPracticeStack(
                      this.state.tempo,
                      this.state.goal,
                      this.state.incrementBy,
                      this.state.incrementEvery,
                      this.state.howLong
                    )
                  }
                >
                  Save
                </button>
              </div>
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
    } else {
      return <></>;
    }
  }
}

export default Metronome;
