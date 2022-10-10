const refPitch = 440.0 // A440

const relativePitch = (relativeSemitones: number) => refPitch * (2 ** (1/12)) ** relativeSemitones 

export const getOctaves = () => {
    const octaves = [-4,-3,-2,-1,0,1,2,3]
    return octaves.map(getPitches)
}

export const getPitches = (octave: number) => {
    const offset = (octave * 12) - 9
    return Array.from(Array(15).keys()).map(
        (val) => Number(relativePitch(offset + val).toFixed(3))
    )
}

