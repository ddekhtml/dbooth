import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    selectedFrame: null,
    rawPhotos: [], 
    selectedFilter: 'normal', 
    filteredPhoto: [],
    currentSubmissionId : null, 
  }),

  actions: {
    setFrame(frame) {
      this.selectedFrame = frame
      this.rawPhotos = []
    },
    addRawPhoto(photo) {
      this.rawPhotos.push(photo)
    },
    setFilter(filter) {
      this.selectedFilter = filter
    },
    resetAll() {
      this.selectedFrame = null
      this.rawPhotos = []
      this.selectedFilter = null
      this.currentSubmissionId= null
      this.filteredPhoto = []
    }, 
    setFilteredPhotos(photo) {
      this.filteredPhoto = photo
    }, 
    resetRawPhotos(){
      this.rawPhotos=[]
    }, 
    setCurrentSubmissionId(id){
      this.currentSubmissionId= id 
    }
  }
})
