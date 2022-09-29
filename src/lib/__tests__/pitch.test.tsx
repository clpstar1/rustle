import { getScale } from "../pitch"

test("calculates the frequency for c correclty", () => {
    const scale = getScale()
    expect(scale[0]).toBe(261.626)
})