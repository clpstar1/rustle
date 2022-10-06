import React, { useState } from "react"
import ADSR from "../lib/adsr"
import { UseStateSetter } from "../lib/util"
import HBox from "./HBox"
import VBox from "./VBox"

const ADSRControls = (
    props: {
        adsr: ADSR,
        setADSR: UseStateSetter<ADSR>
    }) => {

    const { adsr, setADSR } = props
    const [attack, setAttack] = useState(300)
    const [release, setRelease] = useState(600)
    
    const PARAM_MAX = 3000
    const PARAM_MIN = 10 

    const updateAttack = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newAttack = paramAbs(ev.target.value)
        setADSR(adsr.setAttack(newAttack))
        setAttack(newAttack)
    }

    const updateRelease = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newRelease = paramAbs(ev.target.value)
        setADSR(adsr.setRelease(newRelease))
        setRelease(newRelease)
    }
    // pp = (p / 5000) * 100 <=> ((pp / 100) * 5000) + PARAM_MIN = p 
    const paramPercent = (param: number) => Math.floor((param / PARAM_MAX) * 100)
    const paramAbs = (paramPercent: string) => Math.max((Number(paramPercent) / 100) * PARAM_MAX, PARAM_MIN)

    return (
        <div className="adsr-controls">
            <HBox>
                <VBox margin="4px">
                    <h3 className="adsr-header">Attack: </h3>
                    <h3 className="adsr-header">Release: </h3>
                </VBox>

                <VBox margin="4px">
                    <input
                        className="adsr-slider"
                        value={paramPercent(attack)}
                        type="range"
                        onChange={updateAttack}
                    >
                    </input>

                    <input
                        className="adsr-slider"
                        value={paramPercent(release)}
                        type="range"
                        onChange={updateRelease}
                    >
                    </input>
                </VBox>

                <VBox margin="4px">
                    <h3 className="adsr-param">{`${Math.round(attack)}`}</h3>
                    <h3 className="adsr-param">{`${Math.round(release)}`}</h3>
                </VBox>

                <VBox margin="4px">
                    <h3 className="adsr-header">ms</h3>
                    <h3 className="adsr-header">ms</h3>
                </VBox>
            </HBox>
        </div>

    )

}

export default ADSRControls