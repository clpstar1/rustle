import ADSR from "./adsr"

class AttackReleaseEnvelope {

    constructor(
        public adsr: ADSR,
        private param: AudioParam,
        private ctx: AudioContext,
        private peak: number
    ) {}

    // TODO: Add curve type
    attack() {
        const attackStart = this.ctx.currentTime
        const attackEnd = attackStart + this.adsr.attack

        this.param.setValueAtTime(0, attackStart)
        this.param.linearRampToValueAtTime(
            this.peak,
            attackEnd
        )
    }

    release() {
        const oldValue = this.param.value
        this.param.cancelScheduledValues(this.ctx.currentTime)

        const releaseStart = this.ctx.currentTime
        const releaseEnd = releaseStart + this.adsr.release

        this.param.setValueAtTime(oldValue, releaseStart)
        this.param.linearRampToValueAtTime(0, releaseEnd)
    }

}

export default AttackReleaseEnvelope

