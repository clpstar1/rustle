/**
 * OscillatorNode requires BaseAudioContext
 * Gai
 */

import ADSR from "./adsr"
import Gain from "./gain"
import Globals from "./globals"

// TODO adsr volumes
class SynthPiano {

    private oscNode: OscillatorNode

    constructor(
        globals: Globals,
        private adsr: ADSR,
        private gain: Gain,
        private freq: number = 440,
        private type: OscillatorType = "sine",
        private ctx = globals.audioContext
    ) {
        this.oscNode = new OscillatorNode(
            ctx, {
                type: this.type,
                frequency: this.freq 
            }
        )
        
        this.oscNode.connect(this.gain.gainNode)
    }

    pressKey() {
        this.gain.pressKey()
        this.oscNode.start()
    }

    releaseKey() {
        this.gain.releaseKey()
        this.oscNode.stop(this.ctx.currentTime + this.adsr.release)
    }
}

export default SynthPiano