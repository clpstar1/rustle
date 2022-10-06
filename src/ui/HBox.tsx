import { PropsWithChildren } from "react"

type HBoxProps = {
} & PropsWithChildren

const HBox: React.FC<HBoxProps> = ( { children } ) => {

    return (
        <div style={{display: "flex", justifyContent: "space-around", padding: "8px"}}>
            {children}
        </div>
    )
}

export default HBox