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
import momiji from "./assets/momiji-alpha.png"
import KeymapOverlay from './ui/KeymapOverlay';
import NoteTracker from './lib/notetracker';

function App() {

  const OCTAVE_MAX = 3
  const OCTAVE_MIN = -4
  const FLOATING_NOTES_DURATION = 3000

  const noteTrackerRef = useRef(new NoteTracker())

  const [volume, setVolume] = useState(0.25)
  const [wave, setWave] = useState<OscillatorType>("sine")
  const [adsr, setADSR] = useState<ADSR>(new ADSR())
  const [octave, setOctave] = useState(0)
  const [keys, setKeys] = useState(new Map(zip(pianoKeys, getPitches(0))))

  const [globals, setGlobals] = useState(new Globals().setVolume(volume))
  const [player, _setPlayer] = useState(new Player(globals, noteTrackerRef.current))


  const timer = useRef<number>(-1)

  function createFloatingNote(notes: Element) {

    const note = document.createElement("div")
    note.setAttribute("class", "note")
    notes?.appendChild(note)

  }

  function cleanupFloatingNotes(notes: Element) {

    function createClearTimeout(notes: Element) {
      timer.current = window.setTimeout(() => {
        if (notes) {
          notes.replaceChildren(...[])
          timer.current = -1
        }
      }, FLOATING_NOTES_DURATION)
    }

    if (notes) {
      if (timer.current === -1) {
        createClearTimeout(notes)
      } else {
        window.clearTimeout(timer.current)
        createClearTimeout(notes)
      }
    }

  }

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

      const notes = document.querySelector("#notes")
      if (notes) {
        cleanupFloatingNotes(notes)
        if (noteTrackerRef.current.get(freq, wave) === undefined){
          createFloatingNote(notes)
        }
      }

      player.play(adsr, freq, wave)

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

  }, [octave, wave, adsr, keys])


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

        <div className="footer">
          <div className="momiji-container">
            <img src={momiji} id="momiji" />
          </div>

          <div id="notes-container">
            <div id="notes" className="notes"></div>
          </div>

        </div>

    </div>
  );
}

export default App;
