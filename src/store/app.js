import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        client: null,
        commandsExectionMap: null
    }),
    getters: {},
    actions: {},
})