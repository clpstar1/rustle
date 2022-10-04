import React from "react"
import Globals from "../lib/globals"
import { UseStateSetter } from "../lib/util"

const VolumeControl = (
    props : { 
        volume: number,
        setGlobals: UseStateSetter<Globals>
        setVolume: UseStateSetter<number>
    } ) => {

    const { volume, setGlobals, setVolume} = props 

    const updateVolume = (vol: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = Number(vol.target.value)
        setVolume(newVol / 100)
        setGlobals((previous) => previous.setVolume(newVol / 100))
    }

    return (
        <div className="slidecontainer">
            <h2>Volume Control</h2>
            <input type="range" min="0" max="100" value={volume * 100} onChange={updateVolume} className="slider"></input>
        </div>
    )

}

export default VolumeControl