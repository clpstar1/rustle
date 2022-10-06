import { PropsWithChildren } from "react"

type VBoxProps = {
    padding?: string
    margin?: string
} & PropsWithChildren

const VBox: React.FC<VBoxProps> = ( { children, margin, padding } ) => {

    return (
        <div style={{"margin": margin || "0px", "padding": padding || "0px"}}>
            {children}
        </div>
    )
}

export default VBox