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

function App() {

  const OCTAVE_MAX = 3
  const OCTAVE_MIN = -4
  const FLOATING_NOTES_DURATION = 3000
  const NOTE_MAX = 16

  const [volume, setVolume] = useState(0.25)
  const [wave, setWave] = useState<OscillatorType>("sine")
  const [globals, setGlobals] = useState(new Globals().setVolume(volume))
  const [adsr, setADSR] = useState<ADSR>(new ADSR())
  const [player, _setPlayer] = useState(new Player(globals))
  const [octave, setOctave] = useState(0)
  const [keys, setKeys] = useState(new Map(zip(pianoKeys, getPitches(octave))))

  const timer = useRef<number>(-1)
  const noteCounter = useRef<number>(0)

  function createFloatingNote() {

    function createClearTimeout(notes: Element) {
      timer.current = window.setTimeout(() => {
        if (notes) {
          notes.replaceChildren(...[])
          timer.current = -1
        }
      }, FLOATING_NOTES_DURATION)
    }

    function createCounterTimeout() {
      window.setTimeout(() => {
        noteCounter.current -= 1
      }, FLOATING_NOTES_DURATION)
    }

    function appendNote() {
      const note = document.createElement("div")
      note.setAttribute("class", "note")
      notes?.appendChild(note)
      createCounterTimeout()
    }

    const notes = document.querySelector("#notes")
    
    if (noteCounter.current <= NOTE_MAX) {
      appendNote()
      noteCounter.current += 1
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

      createFloatingNote()

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
