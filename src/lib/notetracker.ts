import { SynthKey } from "./synthpiano"


class NoteTracker {

    constructor(
        public oscMap = new Map<string, SynthKey | undefined>() 
    ) {}

    
    public set = (freq: number, type: OscillatorType, val?: SynthKey): void => {
        const k = this.key(freq, type)
        this.oscMap.set(k, val)
    }

    public get = (freq: number, type: OscillatorType): SynthKey | undefined => {
        return this.oscMap.get(this.key(freq, type))
    }

    private key = (freq: number, type: OscillatorType) => `${type}-${freq}`
    
    
}

export default NoteTracker