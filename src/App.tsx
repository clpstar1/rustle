import { useEffect, useRef, useState } from 'react';
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
import { getPitches } from './lib/pitch';
import KeymapOverlay from './ui/KeymapOverlay';
import NoteTracker from './lib/notetracker';
import { decrementOctave, incrementOctave } from './lib/octave';
import FloatingNotes from './ui/FloatingNotes';

import { SynthPiano } from './lib/synthpiano';

function App() {

  const noteTrackerRef = useRef(new NoteTracker())

  const [volume, setVolume] = useState(0.25)
  const [wave, setWave] = useState<OscillatorType>("sine")
  const [adsr, setADSR] = useState<ADSR>(new ADSR())
  const [octave, setOctave] = useState(0)
  const [keys, setKeys] = useState(new Map(zip(pianoKeys, getPitches(0))))


  const [globals, setGlobals] = useState(new Globals().setVolume(volume))
  const [synth, _setSynth] = useState(new SynthPiano(globals, adsr))
  const [player, _setPlayer] = useState(new Player(noteTrackerRef.current))

  useEffect(() => {

    function handleKeyDown(ev: KeyboardEvent) {

      if (ev.key === "x") {
        const next = incrementOctave(octave)
        setOctave(next)
        setKeys(new Map(zip(pianoKeys, getPitches(next))))
      }

      if (ev.key === "y") {
        const prev = decrementOctave(octave)
        setOctave(prev)
        setKeys(new Map(zip(pianoKeys, getPitches(prev))))
      }

      else {
        const freq = keys.get(ev.key)
        if (freq === undefined) return

        const key = synth.createKey(freq, wave)

        player.play(key)
      }
    }

    function handleKeyUp(ev: KeyboardEvent) {
      const freq = keys.get(ev.key)
      if (freq === undefined) return
      player.stop(freq, wave)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }

  }, [octave, wave, adsr, keys, volume])


  return (
    <div className="App">
    
      <VBox margin="8px">
        <Center>
          <VolumeControl volume={volume} setVolume={setVolume} setGlobals={setGlobals} />
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

      <KeymapOverlay/>

      <FloatingNotes tracker={noteTrackerRef.current} wave={wave} keys={keys}/>

    </div>
  );
}

export default App;
