import React from 'react';
import './App.css';
import Metronome from './components/Metronome.jsx';
import ToneGenerator from './components/ToneGenerator.jsx';
import PracticeStack from './components/PracticeStack.jsx';
import AutoGnome from './components/AutoGnome.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      practiceStack: []
    };
    // this.addToPracticeStack = this.addToPracticeStack.bind(this);
  }

  // addToPracticeStack(tempo, goal, incrementBy, incrementEvery, howLong) {
  //   this.state.practiceStack.push({
  //     tempo,
  //     goal,
  //     incrementBy,
  //     incrementEvery,
  //     howLong
  //   });
  //   this.setState({ practiceStack: this.state.practiceStack });
  // }

  render() {
    return (
      <div className="App">
        <h1 className="header">Auto Gnome</h1>
        <div className="main">
          {/* <PracticeStack
            className="practiceStackContainer"
            practiceStack={this.state.practiceStack}
          /> */}
          <div className="moduleContainer">
            <Metronome
              addToPracticeStack={this.addToPracticeStack}
              tempo={80}
              goal={100}
              incrementBy={5}
              incrementEvery={10}
            />
            <div className="break"></div>
            <ToneGenerator />
            {/* <AutoGnome practiceStack={this.state.practiceStack} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
