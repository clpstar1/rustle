import ADSR from "./adsr"
import Globals from "./globals"

class AmpEnvelope {

    constructor(
        globals: Globals,
        public adsr: ADSR,
        public ampGain = new GainNode(globals.audioContext),
        private ctx = globals.audioContext,
        private vol = globals.volume,
    ) {
        vol.connect(ampGain.gain)
        ampGain.connect(ctx.destination)
    }

    play() {
        const attackStart = this.ctx.currentTime
        const attackEnd = attackStart + this.adsr.attack

        this.ampGain.gain.setValueAtTime(0, attackStart)
        this.ampGain.gain.linearRampToValueAtTime(
            this.vol.offset.value, 
            attackEnd
        )
    }

    release() {
        const oldGain = this.ampGain.gain.value
        this.ampGain.gain.cancelScheduledValues(this.ctx.currentTime)

        const releaseStart = this.ctx.currentTime
        const releaseEnd = releaseStart + this.adsr.release

        this.ampGain.gain.setValueAtTime(oldGain, releaseStart)
        this.ampGain.gain.linearRampToValueAtTime(0, releaseEnd)
    }

}

export default AmpEnvelope

