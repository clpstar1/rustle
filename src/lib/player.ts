import ADSR from "./adsr"
import { Globals } from "./globals"
import SynthPiano from "./synthpiano"


class Player {

    constructor(
        private ctx: Globals,
        private oscMap = new Map<string, SynthPiano | undefined>()
        ) {}

    public play = (freq: number, type: OscillatorType = "sine", ) => {
        const k = this.key(freq, type)

        if (this.oscMap.get(k) !== undefined) {
            return 
        }

        const key = new SynthPiano(
            this.ctx.audioContext,
            freq,
            type
        ).setADSR(
            new ADSR(0.6, 0, 0, 0.6)
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