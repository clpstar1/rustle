import { useEffect, useState } from 'react';
import './App.css';
import ADSR from './lib/adsr';
import Globals from "./lib/globals"
import { pianoKeys } from './lib/keymap';
import { Player } from './lib/player';
import { zip } from './lib/util';
import ADSRControls from './ui/ADSRControls';
import Center from './ui/Center';
import VBox from './ui/VBox';
import VolumeControl from './ui/VolumeControl';
import WavePicker from './ui/WavePicker';
import pomu from "./assets/pom.png"
import { getPitches } from './lib/pitch';


function App() {

  const OCTAVE_MAX = 3 
  const OCTAVE_MIN = -4

  const [volume, setVolume] = useState(0.5)
  const [wave, setWave] = useState<OscillatorType>("sine")
  const [globals, setGlobals] = useState(new Globals().setVolume(volume))
  const [adsr, setADSR] = useState<ADSR>(new ADSR())
  const [player, _setPlayer] = useState(new Player(globals)) 
  const [octave, setOctave] = useState(0)
  const [keys, setKeys] = useState(new Map(zip(pianoKeys, getPitches(octave))))

  useEffect(() => {

    function handleKeyDown(ev: KeyboardEvent) {

      if (ev.key === "x") {
        const next = Math.min(OCTAVE_MAX, octave + 1)
        setOctave(next)
        setKeys(new Map(zip(pianoKeys, getPitches(next))))
      }

      if (ev.key === "y") {
        const prev = Math.max(OCTAVE_MIN, octave - 1)
        setOctave(prev)
        setKeys(new Map(zip(pianoKeys, getPitches(prev))))
      }

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

  }, [octave, wave, adsr, keys])


  return (
    <div className="App">
      <h1> Rustle ~ Toy Synthesizer </h1>
      <VBox margin="8px">
        <Center>
          <VolumeControl volume={volume} setVolume={setVolume} setGlobals={setGlobals}/>
        </Center>
      </VBox>
      
      <VBox margin="8px">
        <Center>
          <WavePicker currentWave={wave} setWave={setWave} />
        </Center>
      </VBox>

      <VBox margin="8px">
        <Center>
          <ADSRControls adsr={adsr} setADSR={setADSR} />
        </Center>
      </VBox>

      <a href='https://twitter.com/Ellem__/status/1572972388865953793' target="_blankg">
        <img src={pomu} width="300px"></img>
      </a>
     

    </div>
  );
}

export default App;
