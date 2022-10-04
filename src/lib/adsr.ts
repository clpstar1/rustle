class ADSR {

    constructor(
        public attack = 0.05,
        public decay = 0.3,
        public sustain = 0.4,
        public release = 0.6
    ) {}


    setAttack(attack: number) {
        attack = attack
        return this 
    }

    setRelease(release: number) {
        release = release
        return this
    }
}

export default ADSR