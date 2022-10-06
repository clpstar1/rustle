import ADSR from "./adsr"
import Globals from "./globals"

class Gain {

    constructor(
        globals: Globals,
        private adsr: ADSR,
        public gainNode = new GainNode(globals.audioContext),
        private ctx = globals.audioContext,
        private vol = globals.volume,
        private attackT = 0
    ) {
        vol.connect(gainNode.gain)
        gainNode.connect(ctx.destination)
    }

    pressKey() {
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime)
        this.attackT = this.ctx.currentTime + this.adsr.attack
        this.gainNode.gain.linearRampToValueAtTime(
            this.vol.offset.value, 
            this.ctx.currentTime + this.adsr.attack
        )
    }

    releaseKey() {

        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime)
        this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + this.adsr.release)
    }

}

export default Gain

