import { writable } from 'svelte/store'

export const openFirstModal = writable(false)

export const openSecondModal = writable(false)

export const selectedIndex = writable(0)

export const ongoingTodos = writable([])

export const completedTodos = writable([])

export const user = writable(null)