import NoteTracker from "./notetracker"
import { SynthKey } from "./synth"

class Player {

    constructor(private noteTracker: NoteTracker) {}

    public play = (key: SynthKey) => {
        if (this.noteTracker.get(key.freq, key.wave) !== undefined) {
            return 
        }
        key.play()
        this.noteTracker.set(key.freq, key.wave, key)
    } 
    
    public stop = (freq: number, type: OscillatorType) => {
        const key = this.noteTracker.get(freq, type)
        if (!key) return 
        key.release()
        this.noteTracker.set(freq, type, undefined)
    }

}



export { Player }
