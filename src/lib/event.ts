import { useState } from "react"
import { UseStateSetter } from "./util"

export interface KeydownHandler {
    handleKeydown: (ev: KeyboardEvent) => void
}

export class KeyboardEventDispatcher implements KeydownHandler {

    listeners: KeydownHandler[] = []

    addListener = (listener: KeydownHandler): KeyboardEventDispatcher => {
        this.listeners.push(listener)
        return this
    }

    handleKeydown = (ev: KeyboardEvent) => {
        this.listeners.forEach(listener => {
            listener.handleKeydown(ev)
        })
    }

}