import { getPitches } from "../pitch"

test("calculates the frequency for c correclty", () => {
    const fourth = getPitches(0)
    expect(fourth[0]).toBe(261.626)
    
    const zeroeth = getPitches(-4)
    expect(zeroeth[0]).toBe(16.352)

    const fifth = getPitches(1)
    expect(fifth[0]).toBe(523.251)

})