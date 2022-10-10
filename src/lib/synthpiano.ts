/**
 * OscillatorNode requires BaseAudioContext
 * Gai
 */

import AmpEnvelope from "./envelope"
import Globals from "./globals"

class SynthPiano {

    private oscNode: OscillatorNode

    constructor(
        globals: Globals,
        private amp: AmpEnvelope,
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
        
        this.oscNode.connect(this.amp.gainNode)
    }

    pressKey() {
        this.amp.pressKey()
        this.oscNode.start()
    }

    releaseKey() {
        this.amp.releaseKey()
        this.oscNode.stop(this.ctx.currentTime + this.amp.adsr.release)
    }
}

export default SynthPiano