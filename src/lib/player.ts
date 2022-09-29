import { Globals } from "./globals"

class Player {

    constructor(
        private ctx: Globals,
        private oscMap = new Map<string, OscillatorNode | undefined>()
        ) {}

    public play = (freq: number, type: OscillatorType = "sine", ) => {
        const k = this.key(freq, type)

        if (this.oscMap.get(k) !== undefined) {
            return 
        }

        const osc = new OscillatorNode(this.ctx.audioContext, {
            type: type,
            frequency: freq
        })

        this.oscMap.set(k, osc)

        osc.connect(this.ctx.gainNode)
        osc.start()
    } 
    
    public stop = (freq: number, type: OscillatorType) => {
        const k = this.key(freq, type)
        const osc = this.oscMap.get(k)
        this.oscMap.get(k)?.stop()
        this.oscMap.set(k, undefined)
    }

    private key = (freq: number, type: OscillatorType) => `${type}-${freq}`
}



export { Player }