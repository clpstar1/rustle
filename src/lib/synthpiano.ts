
// TODO decay
// TODO sustain

import ADSR from "./adsr"

// TODO adsr volumes
class SynthPiano {

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

    setADSR(adsr: ADSR) {
        this.adsr = adsr
        return this
    }

}

export default SynthPiano