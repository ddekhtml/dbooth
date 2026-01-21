<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { usePhotoStore } from '../stores/photoStore'
import { useSessionStore } from '../stores/sessionStore'
import EmailModal from '../components/EmailModal.vue'

import {
  createCanvas,
  drawFrame,
  drawPhoto,
  exportCanvas,
  destroyCanvas
} from '../services/canvas'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const photoStore = usePhotoStore()
const resultImage = ref(null)
const router = useRouter()
const showEmailModal = ref(false)

onMounted(async () => {
  const frame = photoStore.selectedFrame
  const photos = photoStore.filteredPhoto
  if (!frame || !frame.canvas || !frame.slots) {
    console.error('FRAME INVALID', frame)
    return
  }
  createCanvas(frame.canvas.width, frame.canvas.height)
  for (let i = 0; i < frame.slots.length; i++) {
    await drawPhoto(photos[i], frame.slots[i])
  }
  await drawFrame(frame.image)
  resultImage.value= exportCanvas('image/png')
  photoStore.setFinalPhoto(resultImage.value)
  resultImage.value= exportCanvas('image/jpeg', 0.5)
  // photoStore.setEmailPhoto(resultImage.value)
  // console.log(photoStore.finalPhoto.length)
  // console.log(photoStore.emailPhoto.length)
})

onUnmounted(() => {
  destroyCanvas()
})

function next(){
  sessionStore.step = "done"
  router.push("/done")
}


</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-10 gap-6 bg-neutral-100">

    <!-- PREVIEW HASIL -->
    <div class="bg-white p-4 rounded-xl shadow">
      <img
        v-if="resultImage"
        :src="resultImage"
        class="w-75 object-contain"
      />
    </div>

    <!-- ACTION -->
    <div class="flex gap-4">
      <button
        @click="showEmailModal = true"
        class="px-6 py-2 rounded-full bg-black text-white"
      >
        Email
      </button>

      <a
        v-if="photoStore.finalPhoto"
        :href="photoStore.finalPhoto"
        download="photobooth.png"
        class="px-6 py-2 rounded-full border border-black"
      >
        Download
      </a>
    </div>
    <EmailModal
      v-if="showEmailModal" :photo="resultImage"
      @close="showEmailModal = false"
    />
  </div>
</template>
