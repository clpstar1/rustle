export class Globals {
    constructor(
        public audioContext: BaseAudioContext = new AudioContext(),
        public gainNode = new GainNode(audioContext)
    ) {
        gainNode.connect(audioContext.destination)
    }

    setVolume(vol: number): Globals {
        if (vol > 1.0 || vol < 0) throw new Error("volume out of range")
        this.gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime)

        return new Globals(
            this.audioContext,
            this.gainNode
        )
    }
}