import React from "react"
import Globals from "./lib/globals"

const VolumeControl = (
    props : { 
        volume: number,
        setGlobals: React.Dispatch<React.SetStateAction<Globals>>
        setVolume: React.Dispatch<React.SetStateAction<number>>
    } ) => {

    const { volume, setGlobals, setVolume} = props 

    const updateVolume = (vol: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = Number(vol.target.value)
        setVolume(newVol / 100)
        setGlobals((previous) => previous.setVolume(newVol / 100))
    }

    return (
        <div className="slidecontainer">
            <h1>Volume Control</h1>
            <input type="range" min="0" max="100" value={volume * 100} onChange={updateVolume} className="slider"></input>
        </div>
    )

}

export default VolumeControl