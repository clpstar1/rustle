import { useEffect, useState } from 'react';
import './App.css';
import Globals from "./lib/globals"
import { pianoKeys } from './lib/keymap';
import { getScale } from './lib/pitch';
import { Player } from './lib/player';
import { zip } from './lib/util';
import VolumeControl from './ui/VolumeControl';
import WavePicker from './ui/WavePicker';

function App() {

  const [volume, setVolume] = useState(0.5)
  const [wave, setWave] = useState<OscillatorType>("sine")
  const [globals, setGlobals] = useState(new Globals().setVolume(volume))
  const [player, _setPlayer] = useState(new Player(globals)) 
  const [keys, _setKeys] = useState(new Map(zip(pianoKeys, getScale())))

 
  useEffect(() => {

    function handleKeyDown(ev: KeyboardEvent) {
      const freq = keys.get(ev.key)
      if (freq === undefined) return
      player.play(freq, wave)
    }

    function handleKeyUp(ev: KeyboardEvent) {
      const freq = keys.get(ev.key)
      if (freq === undefined) return
      player.stop(freq, wave)
    }
  
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup",  handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }

  }, [wave])


  return (
    <div className="App">
      <h1> Toy-Synth </h1>
      <VolumeControl volume={volume} setVolume={setVolume} setGlobals={setGlobals}/>
      <WavePicker currentWave={wave} setWave={setWave} />
    </div>
  );
}

export default App;
