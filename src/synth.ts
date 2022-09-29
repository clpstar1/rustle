// TODO play a fixed sine while key is pressed
// TODO map the keyboard to different frequencies (ableton style)
// TODO swap octave with y and x (ableton style)

class Player {

    constructor(
        private ctx: AudioContext,
        private options: OscillatorOptions
        ) {}

    osc: OscillatorNode | undefined = undefined

    public play = () => {
        if (this.osc !== undefined) {
            return 
        }
        this.osc = new OscillatorNode(this.ctx, this.options)
        this.osc.connect(this.ctx.destination)
        this.osc.start()
    } 
    
    public stop = () => {
        this.osc?.stop()
        this.osc = undefined
    }
}



export { Player }