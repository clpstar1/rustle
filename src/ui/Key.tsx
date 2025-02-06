import ArrowUp from "../assets/arrow-up.svg"
import ArrowDown from "../assets/arrow-down.svg"
import { useRef, useState } from "react"

interface Props {
    keyboardKey: string
    note: string | undefined
    type: string 
    sharp: boolean | undefined
    mousedown: () => void
    mouseup: () => void
}

const noteColors = {
    "note": ["#FFFFFF", "#FFBE65"],
    "unset": ["#FFFFFF", "#CCCCCC"],
    "octave": ["#FFFFFF", "#72C4DA"]
}

export default function Key(props: Props) {
    const delay = 50;
    
    const mousedown = () => { setKeyHeld(true); props.mousedown() }
    const mouseup = () => { 
        setTimeout(() => setKeyHeld(false), delay)
        props.mouseup() }
    const touchstart = (ev: React.TouchEvent) => { 
        ev.preventDefault()
        setKeyHeld(true) 
        props.mousedown() 
    }
    const touchend = (ev: React.TouchEvent) => { 
        ev.preventDefault()
        setTimeout(() => setKeyHeld(false), delay)
        props.mouseup() }

    const [keyHeld, setKeyHeld] = useState(false)
    
    if (props.type == "note") { 
        const containerStyle = { backgroundColor: keyHeld ? noteColors['note'][0] : noteColors['note'][1]}
        const textStyle = { color: keyHeld ? noteColors['note'][1] : noteColors['note'][0]}

        return (
        <div 
            className="mykey-container" 
            onMouseDown={mousedown} 
            onMouseUp={mouseup}
            onTouchStart={touchstart}
            onTouchEnd={touchend}
            style={containerStyle}
        >
            <div className="mykey-upper">{props.keyboardKey}</div>
            <div className="mykey-note" style={textStyle}>{props.note}</div>
            {props.sharp && <div className="mykey-sharp">{"#"}</div>}
        </div>
    )
    } else if (props.type == "unset") {
        return (
            <div className="mykey-container-unset">
                <div className="mykey-upper">{props.keyboardKey}</div>
            </div>
        )
    } else if (props.type == "octave") {
        return(
            <div 
                className="mykey-container-octave"
                onMouseDown={mousedown} 
                onMouseUp={mouseup}
                onTouchStart={touchstart}
                onTouchEnd={touchend}
            >
                <div className="mykey-arrow">
                    <img src={props.keyboardKey == "Y" ? ArrowDown : ArrowUp}></img>
                </div>
                <div className="mykey-upper">{props.keyboardKey}</div>
            </div>)
    }

    throw new Error("not implemented")
}
