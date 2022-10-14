/**
 * OscillatorNode requires BaseAudioContext
 * Gai
 */

import ADSR from "./adsr"
import AmpEnvelope from "./envelope"
import Globals from "./globals"

export class Synth {

    constructor(
        private globals: Globals,
        private adsr: ADSR,
        private ctx = globals.audioContext
    ) {}

    createKey(freq: number, wave: OscillatorType): SynthKey {
        const amp = new AmpEnvelope(this.globals, this.adsr)
        const osc = new OscillatorNode(
            this.ctx, {
                type: wave,
                frequency: freq 
            }
        )
        osc.connect(amp.ampGain)
        return new SynthKey(this.ctx, amp, osc, freq, wave)
    }

}

export class SynthKey {

    constructor(
        public ctx: BaseAudioContext,
        public amp: AmpEnvelope,
        public osc: OscillatorNode,
        public freq: number,
        public wave: OscillatorType
    ) {}

    play() {
        this.amp.play()
        this.osc.start()
    }

    release() {
        this.amp.release()
        this.osc.stop(this.ctx.currentTime + this.amp.adsr.release)
    }

}
