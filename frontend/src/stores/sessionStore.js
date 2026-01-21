import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    eventId: '019355fd-5239-4e48-9287-6307129e90b0',
    eventName: 'DBooth Photobooth',
    eventDate: '07-02-2026',
    step: 'home', 
    isOffline: !navigator.onLine, 
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
  }
})
