
class Globals {

    constructor(
        public audioContext: AudioContext = new AudioContext(),
        public volume: ConstantSourceNode = new ConstantSourceNode(audioContext)
    ) {}

    setVolume(vol: number): Globals {
        if (vol > 1.0 || vol < 0) throw new Error("volume out of range")
        this.volume.offset.value = vol
        return this
    }
}

export default Globals