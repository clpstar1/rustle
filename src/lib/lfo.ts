export class LFO {

    private lfo: OscillatorNode

    constructor(
        type: OscillatorType,
        frequency: number,
        audioContext: BaseAudioContext
    ) {
        this.lfo = audioContext.createOscillator()
        this.lfo.frequency.value = frequency
        this.lfo.type = type
    }

    connect = (audioParam: AudioParam) => {
        this.lfo.connect(audioParam)
        return this
    }

    disconnect = (audioParam: AudioParam) => {
        this.lfo.disconnect(audioParam)
    }

    start = () => {
        this.lfo.start()
    }

    stop = () => {
        this.lfo.stop()
    }
    

}