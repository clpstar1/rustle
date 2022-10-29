import ADSR from "./adsr";

export class Oscillator {

	constructor(
		public ctx: AudioContext,
		public oscillator: OscillatorNode,
		private adsr: ADSR
	) {

	}

	play = (): void => {
		this.oscillator.start()
	}

	release = (): void => {
		this.oscillator.stop(this.ctx.currentTime + this.adsr.release)
	}
}
