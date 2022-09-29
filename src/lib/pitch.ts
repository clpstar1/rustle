const refPitch = 440.0 // A440

const relativePitch = (relativeSemitones: number) => refPitch * (2 ** (1/12)) ** relativeSemitones 

export const getScale = () => Array.from(Array(12).keys()).map(
    v => relativePitch(v-9)
)

