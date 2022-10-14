import ADSR from "./adsr"
import Globals from "./globals"

class AmpEnvelope {

    constructor(
        globals: Globals,
        public adsr: ADSR,
        public gainNode = new GainNode(globals.audioContext),
        private ctx = globals.audioContext,
        private vol = globals.volume,
    ) {
        vol.connect(gainNode.gain)
        gainNode.connect(ctx.destination)
    }

    play() {
        const attackStart = this.ctx.currentTime
        const attackEnd = attackStart + this.adsr.attack

        this.gainNode.gain.setValueAtTime(0, attackStart)
        this.gainNode.gain.linearRampToValueAtTime(
            this.vol.offset.value, 
            attackEnd
        )
    }

    release() {
        const oldGain = this.gainNode.gain.value
        this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime)

        const releaseStart = this.ctx.currentTime
        const releaseEnd = releaseStart + this.adsr.release

        this.gainNode.gain.setValueAtTime(oldGain, releaseStart)
        this.gainNode.gain.linearRampToValueAtTime(0, releaseEnd)
    }

}

export default AmpEnvelope

