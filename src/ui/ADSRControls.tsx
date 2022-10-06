import React, { useState } from "react"
import ADSR from "../lib/adsr"
import { UseStateSetter } from "../lib/util"
import HBox from "./HBox"

const ADSRControls = (
    props: {
        adsr: ADSR,
        setADSR: UseStateSetter<ADSR>
    }) => {

    const { adsr, setADSR } = props
    const [attack, setAttack] = useState(600)

    const updateAttack = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const attack = Number(ev.target.value)
        setADSR(adsr.setAttack(attack))
        setAttack(attack)
    }

    return (
        <div className="adsr-controls">
            <HBox>
                <h3 className="adsr-header">Attack: </h3>
                <input 
                    value={attack} 
                    type="text" 
                    onChange={updateAttack}
                >   
                </input>
                <span>ms</span>
            </HBox>
        </div>
        
    )

}

export default ADSRControls