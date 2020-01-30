import React from 'react';
import { play, cancel } from './metronomeUtil.js';

class Metronome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: this.props.tempo || 60,
      goal: this.props.goal || 60,
      incrementBy: this.props.incrementBy || 0,
      incrementEvery: this.props.incrementEvery || 0,
      isTesting: false
    };
  }

  changeTempo(tempo) {
    if (tempo === '') {
      this.setState({ tempo: 0 });
    }
    if (Number(tempo) && tempo > 9) {
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
    cancel();
    if (newIncrement === '') {
      this.setState({ incrementBy: 0 });
    } else {
      this.setState({ incrementBy: newIncrement });
    }
  }
  changeIncrementEvery(newIncrementEvery) {
    cancel();
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
    if (Number(this.state.tempo) && this.state.tempo > 10) {
      this.setState({ tempo: this.state.tempo + 10 });
      this.start();
    }
  }
  decrementBy10() {
    this.stopMetronome();
    if (Number(this.state.tempo) && this.state.tempo > 10) {
      this.setState({ tempo: this.state.tempo - 10 });
      this.start();
    }
  }

  render() {
    if (!this.state.hidden) {
      return (
        <div className="module">
          <div className="background">
            <h1 className="moduleHeader">Metronome</h1>
            <ul className="moduleContents">
              <div className="moduleElement">
                Starting Tempo
                <input
                  type="text"
                  value={this.state.tempo}
                  onChange={e => {
                    this.changeTempo(e.target.value);
                  }}
                ></input>
              </div>
              <div className="moduleElement">
                Goal Tempo
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
              <button className="playMetronome" onClick={() => this.start()}>
                Start
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
