import SynthPiano from "./synthpiano"

class NoteTracker {

    constructor(
        public oscMap = new Map<string, SynthPiano | undefined>() 
    ) {}

    
    public set = (freq: number, type: OscillatorType, val?: SynthPiano) => {
        const k = this.key(freq, type)
        this.oscMap.set(k, val)
    }

    public get = (freq: number, type: OscillatorType) => {
        return this.oscMap.get(this.key(freq, type))
    }

    private key = (freq: number, type: OscillatorType) => `${type}-${freq}`
    
    
}

export default NoteTracker