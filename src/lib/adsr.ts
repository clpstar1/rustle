import Globals from "./globals"

class ADSR {

    constructor(
        public attack = 0.05,
        public decay = 0.3,
        public sustain = 0.4,
        public release = 0.6, 
    ) {
    }


    setAttack(attack: number) {
        this.attack = attack / 1000
        return this 
    }

    setRelease(release: number) {
        this.release = release / 1000
        return this
    }
}

export default ADSR