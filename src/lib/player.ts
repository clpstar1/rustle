import ADSR from "./adsr"
import AmpEnvelope from "./envelope"
import Globals  from "./globals"
import NoteTracker from "./notetracker"
import SynthPiano from "./synthpiano"


class Player {

    constructor(
        private ctx: Globals,
        private noteTracker: NoteTracker
        ) {}

    public play = (adsr: ADSR, freq: number, type: OscillatorType = "sine") => {

        if (this.noteTracker.get(freq, type) !== undefined) {
            return 
        }

        const gain = new AmpEnvelope(this.ctx, adsr)

        const key = new SynthPiano(
            this.ctx,
            gain,
            freq,
            type
        )

        this.noteTracker.set(freq, type, key)
        key.pressKey()
    } 
    
    public stop = (freq: number, type: OscillatorType) => {

        const key = this.noteTracker.get(freq, type)
        if (!key) return 
        key.releaseKey()
        this.noteTracker.set(freq, type, undefined)
    }

}



export { Player }