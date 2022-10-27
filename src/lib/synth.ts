/**
 * OscillatorNode requires BaseAudioContext
 * Gai
 */

import ADSR from "./adsr"
import AttackReleaseEnvelope from "./envelope"
import Globals from "./globals"

export class Synth {

    constructor(
        private globals: Globals,
        private adsr: ADSR,
        private ctx = globals.audioContext
    ) {}

    createKey(freq: number, wave: OscillatorType): SynthKey {
        const volume = this.globals.volume
        const gain = this.globals.audioContext.createGain()

        const envelope = new AttackReleaseEnvelope(
            this.adsr, 
            gain.gain, 
            this.ctx, 
            volume.offset.value
        )

        const osc = new OscillatorNode(
            this.ctx, {
                type: wave,
                frequency: freq 
            }
        )

        volume.connect(gain.gain)
        gain.connect(this.ctx.destination)
        osc.connect(gain)
        return new SynthKey(this.ctx, envelope, osc, freq, wave)
    }

}

export class SynthKey {

    constructor(
        public ctx: BaseAudioContext,
        public amp: AttackReleaseEnvelope,
        public osc: OscillatorNode,
        public freq: number,
        public wave: OscillatorType
    ) {}

    play() {
        this.amp.attack()
        this.osc.start()
    }

    release() {
        this.amp.release()
        this.osc.stop(this.ctx.currentTime + this.amp.adsr.release)
    }

}
