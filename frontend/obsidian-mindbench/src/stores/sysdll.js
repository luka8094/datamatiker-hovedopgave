import {writable} from "svelte/store"

export const authorized = writable(null)

export const VIEW = writable(null)
export const resizeView = writable(false)

export const temporaryStorage = writable([])
export const workspaceHistory = writable([])