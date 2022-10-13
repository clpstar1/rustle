import { PropsWithChildren, useEffect } from "react"
import momiji from "../assets/momiji.png"
import NoteTracker from "../lib/notetracker"

type FloatingNotesProps = {
    tracker: NoteTracker
    wave: OscillatorType, 
    keys: Map<string, number>
} & PropsWithChildren

const FloatingNotes = (props: FloatingNotesProps) => {

    const FLOATING_NOTES_DURATION = 3000

    const { tracker, wave, keys } = props

    const createFloatingNote = () => {
        const notes = document.querySelector("#notes")
        const note = document.createElement("div")
        note.setAttribute("class", "note")
        notes?.appendChild(note)
    
        window.setTimeout(() => {
          note.remove()
        }, FLOATING_NOTES_DURATION)
    
      }

    useEffect(() => {

        function handleKeydown(ev: KeyboardEvent) {
            const freq = keys.get(ev.key)
            if (freq === undefined) return 
            if (tracker.get(freq, wave) !== undefined) return 
            createFloatingNote()
        }

        window.addEventListener("keydown", handleKeydown)

        return () => {
            window.removeEventListener("keydown", handleKeydown)
        }

    })

    return (
        <div className="footer">
          <div className="momiji-container">
            <img src={momiji} id="momiji" />
          </div>

          <div id="notes-container">
            <div id="notes" className="notes"></div>
          </div>

        </div>
    )
}

export default FloatingNotes