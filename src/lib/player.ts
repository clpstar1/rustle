class Player {

    constructor(
        private ctx: AudioContext,
        private oscMap = new Map<string, OscillatorNode | undefined>(),l
        ) {}

    public play = (freq: number, type: OscillatorType = "sine", ) => {
        const k = this.key(freq, type)

        if (this.oscMap.get(k) !== undefined) {
            return 
        }

        const osc = new OscillatorNode(this.ctx, {
            type: type,
            frequency: freq
        })

        this.oscMap.set(k, osc)

        osc.connect(this.ctx.destination)
        osc.start()
    } 
    
    public stop = (freq: number, type: OscillatorType) => {
        const k = this.key(freq, type)
        this.oscMap.get(k)?.stop()
        this.oscMap.set(k, undefined)
    }

    private key = (freq: number, type: OscillatorType) => `${type}-${freq}`
}



export { Player }