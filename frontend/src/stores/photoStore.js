import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    selectedFrame: null,
    rawPhotos: [], 
    selectedFilter: 'normal',
    finalPhoto: [] , 
    filteredPhoto: []
  }),

  actions: {
    setFrame(frame) {
      this.selectedFrame = frame
      this.rawPhotos = []
      this.finalPhoto = null
    },
    addRawPhoto(photo) {
      this.rawPhotos.push(photo)
    },
    resetPhotos() {
      this.rawPhotos = []
      this.finalPhoto = null
    },
    setFilter(filter) {
      this.selectedFilter = filter
    },
    setFinalPhoto(photo) {
      this.finalPhoto = photo
    },
    resetAll() {
      this.selectedFrame = null
      this.rawPhotos = []
      this.selectedFilter = null
      this.finalPhoto = null
      this.filteredPhoto = []
    }, 
    setFilteredPhotos(photo) {
      this.filteredPhoto = photo
    }
  }
})
