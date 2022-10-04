import React from "react"

export const zip = <A,B> (left: Array<A>, right: Array<B>): Array<[A, B]> => {
    return left.map((lv, i) => [lv, right[i]])
}

export type UseStateSetter<T> = React.Dispatch<React.SetStateAction<T>>