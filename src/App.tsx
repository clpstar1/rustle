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
import NoteTracker from './lib/notetracker';
import { decrementOctave, incrementOctave } from './lib/octave';
import FloatingNotes from './ui/FloatingNotes';

import { Synth } from './lib/synth';
import Key from './ui/Key';

interface KeyProps {
  type: "note" | "unset" | "octave"
  keyboard: string
  note?: string
  sharp?: boolean
}

function App() {

  const noteTrackerRef = useRef(new NoteTracker())

  const [volume, setVolume] = useState(0.25)
  const [wave, setWave] = useState<OscillatorType>("sine")
  const [adsr, setADSR] = useState<ADSR>(new ADSR())
  const [octave, setOctave] = useState(0)
  const [keys, setKeys] = useState(new Map(zip(pianoKeys, getPitches(0))))

  const [globals, setGlobals] = useState(new Globals())
  const [synth] = useState(new Synth(globals, adsr))
  const [player] = useState(new Player(noteTrackerRef.current))
  
  const mkRow = (row: KeyProps[]) => row.map(key => {
    var mousedown = () => {}
    var mouseup = () => {}
    const freq = keys.get(key.keyboard.toLowerCase())
    if (freq) {
      mousedown = () => {
        if (freq === undefined) {
          console.log(`warning ${key.note} has no associated pitch`)
          return;
        }
        player.play(
          synth.createKey(freq, wave, volume))
      }
      mouseup = () => {
        player.stop(freq, wave)
      }
    }
    if (key.type == "octave" && key.keyboard == "Y") {
      mousedown = () => {
        const next = decrementOctave(octave)
        setOctave(next)
        setKeys(new Map(zip(pianoKeys, getPitches(next))))
      }
    }
    if (key.type == "octave" && key.keyboard == "X") {
      mousedown = () => {
        const next = incrementOctave(octave)
        setOctave(next)
        setKeys(new Map(zip(pianoKeys, getPitches(next))))
      }
    }

    return <Key 
      key={key.keyboard}
      type={key.type} 
      note={key.note} 
      keyboard={key.keyboard} 
      sharp={key.sharp}
      mousedown={mousedown}
      mouseup={mouseup}/>
  })

  const upperRow: KeyProps[] = [
    { type: "unset", keyboard: "Q" },
    { type: "note", keyboard: "W", note: "C", sharp: true },
    { type: "note", keyboard: "E", note: "D", sharp: true },
    { type: "unset", keyboard: "R" },
    { type: "note", keyboard: "T", note: "F", sharp: true },
    { type: "note", keyboard: "Z", note: "G", sharp: true },
    { type: "note", keyboard: "U", note: "A", sharp: true },
    { type: "unset", keyboard: "I" },
    { type: "note", keyboard: "O", note: "C", sharp: true },
    { type: "unset", keyboard: "P" },
  ]
  
  const middleRow: KeyProps[] = [
    { type: "note", keyboard: "A", note: "C", },
    { type: "note", keyboard: "S", note: "D", },
    { type: "note", keyboard: "D", note: "E", },
    { type: "note", keyboard: "F", note: "F", },
    { type: "note", keyboard: "G", note: "G", },
    { type: "note", keyboard: "H", note: "A", },
    { type: "note", keyboard: "J", note: "B", },
    { type: "note", keyboard: "K", note: "C", },
    { type: "note", keyboard: "L", note: "D", },
  ]
  
  const bottomRow: KeyProps[] = [
    { type: "octave", keyboard: "Y"},
    { type: "octave", keyboard: "X"},
    { type: "unset", keyboard: "C" },
    { type: "unset", keyboard: "V" },
    { type: "unset", keyboard: "B" },
    { type: "unset", keyboard: "N" },
    { type: "unset", keyboard: "M" },
    { type: "unset", keyboard: "," },
    { type: "unset", keyboard: "." },
  ]

  useEffect(() => {

    async function handleKeyDown(ev: KeyboardEvent) {

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
        const key = synth.createKey(freq, wave, volume)
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
      
      <Center>
        <div className='mykey-row'>
          {mkRow(upperRow)}
        </div>
      </Center>
      <Center>
        <div className='mykey-row'>
          {mkRow(middleRow)}
        </div>
      </Center>
      <Center>
        <div className='mykey-row' style={{paddingLeft: 32}}>
          {mkRow(bottomRow)}
        </div>
      </Center>

      <FloatingNotes tracker={noteTrackerRef.current} wave={wave} keys={keys}/>
      <a 
      href="https://github.com/clpstar1/rustle"
      target="_blank"
      style={{position: "absolute", left: "5%", bottom: "5%"}}
      >Source</a>


    </div>
  );
}

export default App;
