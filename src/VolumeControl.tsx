import React, { useState } from "react"
import { Globals } from "./lib/globals"

const VolumeControl = (
    props : { 
        setGlobals: React.Dispatch<React.SetStateAction<Globals>>
    } ) => {

    const { setGlobals } = props 
    const [volume, setVolume] = useState(50)

    const updateVolume = (vol: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = Number(vol.target.value)
        setVolume(newVol)
        setGlobals((previous) => previous.setVolume(newVol / 100))
    }

    return (
        <div className="slidecontainer">
            <h1>Volume Control</h1>
            <input type="range" min="0" max="100" value={volume} onChange={updateVolume} className="slider"></input>
        </div>
    )

}

export default VolumeControl