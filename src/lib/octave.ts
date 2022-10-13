const OCTAVE_MAX = 3
const OCTAVE_MIN = -4

export const decrementOctave = (octave: number) => {
    return Math.max(OCTAVE_MIN, octave - 1)
}

export const incrementOctave = (octave: number) => {
    return Math.min(OCTAVE_MAX, octave + 1)
}