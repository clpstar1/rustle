import ArrowUp from "../assets/arrow-up.svg"
import ArrowDown from "../assets/arrow-down.svg"

interface Props {
    keyboard: string
    note: string | undefined
    type: string 
    sharp: boolean | undefined
    mousedown: () => void
    mouseup: () => void
}

export default function Key(props: Props) {
    
    if (props.type == "note") { return (
        <div 
            className="mykey-container" 
            onMouseDown={props.mousedown} 
            onMouseUp={props.mouseup}
            onTouchStart={props.mousedown}
            onTouchEnd={props.mouseup}
        >
            <div className="mykey-upper">{props.keyboard}</div>
            <div className="mykey-note">{props.note}</div>
            {props.sharp && <div className="mykey-sharp">{"#"}</div>}
        </div>
    )
    } else if (props.type == "unset") {
        return (
            <div className="mykey-container-unset">
                <div className="mykey-upper">{props.keyboard}</div>
            </div>
        )
    } else if (props.type == "octave") {
        return(
            <div 
                className="mykey-container-octave"
                onMouseDown={props.mousedown} 
                onMouseUp={props.mouseup}
                onTouchStart={props.mousedown}
                onTouchEnd={props.mouseup}
            >
                <div className="mykey-arrow">
                    <img src={props.keyboard == "Y" ? ArrowDown : ArrowUp}></img>
                </div>
                <div className="mykey-upper">{props.keyboard}</div>
            </div>)
    }

    throw new Error("not implemented")
}
