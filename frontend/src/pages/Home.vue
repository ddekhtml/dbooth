<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import { usePhotoStore } from '../stores/photoStore'
import { v4 as uuidv4 } from 'uuid'
import { clearAllSubmissions, saveSubmission } from '../services/indexesdb'
import {onMounted} from 'vue'
const router = useRouter()
const photo = usePhotoStore()
const session = useSessionStore()

async function startEvent() {
  const setId = uuidv4()
  const time = new Date().toISOString()
  await saveSubmission({
    id : setId, 
    createdAt : time,
    eventId : session.eventId, 
    eventName: session.eventName, 
    eventDate: session.eventDate, 
    selectedFilter: null,
    filteredPhoto: null, 
    finalPhoto: null, 
    printed : false, 
    emailed : false, 
    email : '', 
  })
  photo.setCurrentSubmissionId(setId)
  photo.setCreated(time)
  session.setStep('frame')
  router.push('/frame')
}

// onMounted(() => {
//   clearAllSubmissions()
// })

</script>

<template>
  <div>
    <h1>HOME</h1>
    <button @click="startEvent">Start Photobooth</button>
  </div>
</template>
