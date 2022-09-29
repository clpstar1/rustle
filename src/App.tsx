import { useEffect, useState } from 'react';
import './App.css';
import { Globals } from './lib/globals';
import { pianoKeys } from './lib/keymap';
import { getScale } from './lib/pitch';
import { Player } from './lib/player';
import { zip } from './lib/util';
import VolumeControl from './VolumeControl';

function App() {


  const [globals, setGlobals] = useState(new Globals())

  const [player, _setPlayer] = useState(new Player(globals))
  const [keys, _setKeys] = useState(new Map(zip(pianoKeys, getScale())))

  useEffect(() => {

    function handleKeyDown(ev: KeyboardEvent) {
      const freq = keys.get(ev.key)
      if (freq === undefined) return
      player.play(freq)
    }

    function handleKeyUp(ev: KeyboardEvent) {
      const freq = keys.get(ev.key)
      if (freq === undefined) return
      player.stop(freq, "sine")
    }
  
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup",  handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }

  }, [])


  return (
    <div className="App">
      <h1> Toy-Synth </h1>
      <VolumeControl setGlobals={setGlobals}/>
    </div>
  );
}

export default App;
