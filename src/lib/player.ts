import { Globals } from "./globals"

class ADSR {

    constructor(
        public attack = 0.05,
        public decay = 0.3,
        public sustain = 0.4,
        public release = 0.6
    ) {}


    setAttack(attack: number) {
        attack = attack
        return this 
    }

    setRelease(release: number) {
        release = release
        return this
    }
}

class OscKey {

    private oscNode: OscillatorNode
    private gainNode: GainNode
    private adsr = new ADSR()
    private vol = 1.0

    constructor(
        private ctx: BaseAudioContext,
        private freq: number = 440,
        private type: OscillatorType = "sine",
    ) {
        this.oscNode = new OscillatorNode(
            this.ctx, {
                type: this.type,
                frequency: this.freq 
            }
        )
        this.gainNode = new GainNode(this.ctx)
        this.oscNode.connect(this.gainNode)
        this.gainNode.connect(ctx.destination)
    }

    pressKey() {
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime)
        this.gainNode.gain.linearRampToValueAtTime(this.vol, this.ctx.currentTime + this.adsr.attack)
        this.oscNode.start()
    }

    releaseKey() {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime)
        this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + this.adsr.release)
        this.oscNode.stop(this.ctx.currentTime + this.adsr.release + 0.1)
    }

}

class Player {

    constructor(
        private ctx: Globals,
        private oscMap = new Map<string, OscKey | undefined>()
        ) {}

    public play = (freq: number, type: OscillatorType = "sine", ) => {
        const k = this.key(freq, type)

        if (this.oscMap.get(k) !== undefined) {
            return 
        }

        const key = new OscKey(
            this.ctx.audioContext,
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