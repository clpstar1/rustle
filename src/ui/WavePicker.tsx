import sine from "../assets/sine.svg"
import triangle from "../assets/triangle.svg"
import saw from "../assets/saw.svg"
import square from "../assets/square.svg"
import React from "react"
import { UseStateSetter } from "../lib/util"
import Center from "./Center"


const WavePicker = (
    props: {
        currentWave: OscillatorType,
        setWave: UseStateSetter<OscillatorType>
    }
) => {

    const { currentWave, setWave } = props

    const waves: Array<[OscillatorType, string]> = [
        ["sine", sine],
        ["triangle", triangle],
        ["sawtooth", saw],
        ["square", square]
    ]

    return (
        <div className="wavepicker">
            <h2 style={{ margin: "16px" }}>Wavetype:</h2>
            <div className="wave-container">
                {waves.map(([waveName, path]) => (
                    <div className={
                        currentWave !== waveName
                            ? "wavebox"
                            : "wavebox wavebox-selected"
                    } onClick={() => setWave(waveName)}>
                        <img className="wave" src={path}></img>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default WavePicker