/**
 * OscillatorNode requires BaseAudioContext
 * Gai
 */

import ADSR from "./adsr"
import AttackReleaseEnvelope from "./envelope"
import Globals from "./globals"
import { Oscillator } from "./oscillator"

export class Synth {

	constructor(
		private globals: Globals,
		private adsr: ADSR,
		private ctx = globals.audioContext
	) { }

	createKey(freq: number, wave: OscillatorType): SynthKey {
		const volume = this.globals.volume
		const gain = this.globals.audioContext.createGain()

		const envelope = new AttackReleaseEnvelope(
			this.adsr,
			gain.gain,
			this.ctx,
			volume.offset.value
		)

		const osc = new Oscillator(
			this.globals.audioContext,
			new OscillatorNode(
				this.ctx, {
				type: wave,
				frequency: freq

			}), this.adsr
		)

		volume.connect(gain.gain)
		gain.connect(this.ctx.destination)
		osc.oscillator.connect(gain)

		return new SynthKey(
				envelope,
				osc,
				freq,
				wave
			)
	}

}


export class SynthKey {

	constructor(
		public amp: AttackReleaseEnvelope,
		public osc: Oscillator,
		public freq: number,
		public wave: OscillatorType
	) { }

	play() {
		this.amp.attack()
		this.osc.play()
	}

	release() {
		this.amp.release()
		this.osc.release()
	}

}


export class SynthAlt {

	constructor(
		private osc: OscillatorNode,
		public freq: number,
		public wave: OscillatorType
	) { }

	static createKey(ctx: AudioContext, freq: number, wave: OscillatorType): SynthAlt {
		return new SynthAlt(
			new OscillatorNode(ctx, {
				frequency: freq,
				type: wave
			}),
			freq,
			wave
		)
	}

	connectParam(param: AudioParam): void {
		this.osc.connect(param)
	}

	connectAudioNode(node: AudioNode): void {
		this.osc.connect(node)
	}


}
