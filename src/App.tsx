import './App.css';
import { pianoKeys } from './lib/keymap';
import { getScale } from './lib/pitch';
import { Player } from './lib/player';
import { zip } from './lib/util';

function App() {

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

  return (
    <div className="App">
      <h1> Toy-Synth </h1>
    </div>
  );
}

export default App;
