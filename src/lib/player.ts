import ADSR from "./adsr"
import AmpEnvelope from "./envelope"
import Globals  from "./globals"
import SynthPiano from "./synthpiano"


class Player {

    constructor(
        private ctx: Globals,
        private oscMap = new Map<string, SynthPiano | undefined>()
        ) {}

    public play = (adsr: ADSR, freq: number, type: OscillatorType = "sine") => {
        const k = this.key(freq, type)

        if (this.oscMap.get(k) !== undefined) {
            return 
        }

        const gain = new AmpEnvelope(this.ctx, adsr)

        const key = new SynthPiano(
            this.ctx,
            gain,
            freq,
            type
        )

        this.oscMap.set(k, key)
        key.pressKey()
    } 
    
    public stop = (freq: number, type: OscillatorType) => {
        const k = this.key(freq, type)
        const key = this.oscMap.get(k)
        if (!key) return 
        key.releaseKey()
        this.oscMap.set(k, undefined)
    }

    private key = (freq: number, type: OscillatorType) => `${type}-${freq}`
}



export { Player }