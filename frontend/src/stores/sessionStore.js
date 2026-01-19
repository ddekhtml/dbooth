import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    eventId: null,
    eventName: '',
    eventDate: '',
    step: 'home', 
    isOffline: !navigator.onLine
  }),

  actions: {
    setEvent({ id, name, date }) {
      this.eventId = id
      this.eventName = name
      this.eventDate = date
    },

    setStep(step) {
      this.step = step
    },

    resetSession() {
      this.step = 'home'
    },

    setOfflineStatus(status) {
      this.isOffline = status
    }
  }
})
