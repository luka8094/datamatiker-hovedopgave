import {writable} from "svelte/store"

export const authorized = writable(null)
export const user = writable(null)
export const welcome = writable(null)
export const bigQuery = writable(null)

export const VIEW = writable(null)
export const resizeView = writable(false)

export const temporaryStorage = writable([])
export const workspaceHistory = writable([])
export const archiveStorage = writable([])

export const activeFile = writable(null)