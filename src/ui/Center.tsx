import { PropsWithChildren } from "react"

const Center: React.FC<PropsWithChildren> = ( { children } ) => {

    return (
        <div style={{"display": "flex", "justifyContent": "center"}}>
            {children}
        </div>
    )
}

export default Center