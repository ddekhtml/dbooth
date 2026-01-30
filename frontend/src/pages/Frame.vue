<script setup>
import { useRouter } from 'vue-router'
import { frames } from '../config/frames'
import { useSessionStore } from '../stores/sessionStore'
import { usePhotoStore } from '../stores/photoStore'
import { updateSubmission } from '../services/indexesdb'
import { ref, onMounted } from 'vue'

const router = useRouter()
const session = useSessionStore()
const photo = usePhotoStore()

async function selectFrame(frame) {
  photo.setFrame(frame)
  await updateSubmission(photo.currentSubmissionId, {
    selected_frame: frame, 
  })
  session.setStep('photo')
  router.push('/camera')
}

onMounted( async () => {
  if (!photo.currentSubmissionId){
    session.setStep('home')
    router.push('/')
    return 
  }
})

</script>

<template>
  <div class="w-full h-dvh  flex flex-col overflow-hidden bg-bg">
    <img src="../assets/decoration/line.png" alt="" class="w-full block">
    <h1 class="text-maroon text-center text-6xl font-sunday m-8">PILIH FRAME</h1>
    <div class="flex flex-row overflow-x-auto bg-bg  w-full gap-x-10 scrollbar-hide m-auto">
      <div v-for="frame in frames" :key="frame.id" class="shrink-0 flex flex-col items-center"
>
        <img :src="frame.image" alt="" class="w-80">
        <button @click="selectFrame(frame)" class="font-serif text-bg bg-maroon rounded-full px-8 m-2 pt-1 pb-1">Pilih</button>
      </div>
      
    </div>

    <img src="../assets/decoration/line.png" alt="" class="w-full block mt-auto">
  </div>
</template>