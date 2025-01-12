import React from "react"

export const zip = <A,B> (left: Array<A>, right: Array<B>): Array<[A, B]> => {
    return left.map((lv, i) => [lv, right[i]])
}

export type UseStateSetter<T> = React.Dispatch<React.SetStateAction<T>>

const FLOATING_NOTES_DURATION = 3000

export const createFloatingNote = () => {
    const notes = document.querySelector("#notes")
    if (notes === null) return;
    const note = document.createElement("div")
    note.setAttribute("class", "note")
    notes.appendChild(note)

    window.setTimeout(() => {
      note.remove()
    }, FLOATING_NOTES_DURATION)

  }