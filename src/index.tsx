import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Player } from './lib/player';
import { pianoKeys } from './lib/keymap';
import { getScale } from './lib/pitch';
import { zip } from './lib/util';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const player = new Player(new AudioContext())

const keys = new Map(zip(pianoKeys, getScale()))

document.addEventListener("keydown", (ev) => {
  const freq = keys.get(ev.key)
  if (freq === undefined) return 
  player.play(freq)
})

document.addEventListener("keyup", (ev) => {
  const freq = keys.get(ev.key)
  if (freq === undefined) return 
  player.stop(freq, "sine")
})
