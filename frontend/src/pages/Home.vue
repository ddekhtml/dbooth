<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import { usePhotoStore } from '../stores/photoStore'
import { v4 as uuidv4 } from 'uuid'
import { clearAllSubmissions, saveSubmission } from '../services/indexesdb'
import { onMounted } from 'vue'
const router = useRouter()
const photo = usePhotoStore()
const session = useSessionStore()

async function startEvent() {
  const setId = uuidv4()
  const time = new Date().toISOString()
  await saveSubmission({
    id : setId, 
    created_at : time,
    event_id : session.eventId, 
    event_name : session.eventName, 
    event_date: session.eventDate, 
    raw_photos : null,
    selected_filter: null,
    filtered_photos: null, 
    final_photo: null, 
    selected_frame: null, 
    printed : false, 
    emailed : false, 
    email : null,
  })
  photo.setCurrentSubmissionId(setId)
  photo.setCreated(time)
  session.setStep('frame')
  router.push('/frame')
}

onMounted(() => {
  session.resetSession()
})

function toAdmin(){
  router.push('/admin')
}

</script>

<template>
  
  <div class="h-dvh w-full flex flex-col text-maroon font-sunday overflow-hidden">

    <h1 class="text-9xl self-center mt-25">
      <button @click="toAdmin">
        ZIDNI & AIKE
      </button>
      
    </h1>

    <p class="self-center text-3xl mt-16 tracking-wide">
      <button @click="clearAllSubmissions()">
        07.02.2026
      </button>
    </p>

    <div class="mt-10 self-center bg-maroon font-serif text-bg text-4xl px-20 pt-4 pb-5 rounded-full">
      <button @click="startEvent">Mulai</button>
    </div>

    <!-- photostrip -->
    <div class="mt-auto overflow-hidden w-full">
      <div class="relative font-serif text-right text-md pr-23 mb-2">
        powered by
        <img
          src="/img/dbooth.png"
          alt=""
          class="absolute right-0 top-1/2 -translate-y-1/2 w-25 block"
        >
      </div>
      <img src="/img/love.png" alt="" class="w-full block">
    </div>

  </div>


      <!-- <button @click="startEvent">Start Photobooth</button> -->
 
</template>
