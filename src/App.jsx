import React from 'react';
import './App.css';
import Metronome from './components/Metronome.jsx';
import ToneGenerator from './components/ToneGenerator.jsx';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <div className="navElement">Home</div>
          <div className="navElement">My Schedule</div>
          <div className="navElement">Other</div>
        </ul>
      </nav>
      <div className="main">
        <div className="practiceStackContainer">
          stack container
          <div className="practiceStackElement">
            Element 1\nisjadijspdijpaisj
          </div>
          <div className="practiceStackElement">Element 2</div>
          <div className="practiceStackElement">Element 3</div>
        </div>
        <div className="moduleContainer">
          <Metronome />
          <ToneGenerator />
        </div>
      </div>
    </div>
  );
}

export default App;
