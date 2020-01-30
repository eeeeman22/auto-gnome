import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

if (!window.webkitAudioContext) {
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  ReactDOM.render(
    <div>
      Sorry, this browser isn't supported. You have to use Chrome for
      AudioContext to work correctly!
    </div>,
    document.getElementById('root')
  );
}
