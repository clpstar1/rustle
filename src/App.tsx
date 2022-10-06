import { useEffect, useState } from 'react';
import './App.css';
import ADSR from './lib/adsr';
import Globals from "./lib/globals"
import { pianoKeys } from './lib/keymap';
import { getScale } from './lib/pitch';
import { Player } from './lib/player';
import { zip } from './lib/util';
import ADSRControls from './ui/ADSRControls';
import Center from './ui/Center';
import VBox from './ui/VBox';
import VolumeControl from './ui/VolumeControl';
import WavePicker from './ui/WavePicker';

function App() {

  const [volume, setVolume] = useState(0.5)
  const [wave, setWave] = useState<OscillatorType>("sine")
  const [globals, setGlobals] = useState(new Globals().setVolume(volume))
  const [adsr, setADSR] = useState<ADSR>(new ADSR())
  const [player, _setPlayer] = useState(new Player(globals)) 
  const [keys, _setKeys] = useState(new Map(zip(pianoKeys, getScale())))

 
  useEffect(() => {

    function handleKeyDown(ev: KeyboardEvent) {
      const freq = keys.get(ev.key)
      if (freq === undefined) return
      player.play(adsr, freq, wave)
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

  }, [wave, adsr])


  return (
    <div className="App">
      <h1> Toy-Synth </h1>
      <VBox margin="4px">
        <Center>
          <VolumeControl volume={volume} setVolume={setVolume} setGlobals={setGlobals}/>
        </Center>
      </VBox>
      
      <VBox margin="4px">
        <Center>
          <WavePicker currentWave={wave} setWave={setWave} />
        </Center>
      </VBox>

      <VBox margin="16px">
        <Center>
          <ADSRControls adsr={adsr} setADSR={setADSR} />
        </Center>
      </VBox>

    </div>
  );
}

export default App;
