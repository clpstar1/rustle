import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Player } from './synth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const player = new Player(new AudioContext(), {
  type : "sine",
  frequency: 400
})

document.addEventListener("keydown", (ev) => {
  if (ev.key === "a") player.play()
})

document.addEventListener("keyup", (ev) => {
  if (ev.key === "a") player.stop()
})
