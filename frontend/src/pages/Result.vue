<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoStore } from '../stores/photoStore'
import { useSessionStore } from '../stores/sessionStore'
import EmailModal from '../components/EmailModal.vue'
import QrDisplay from '../components/QrDisplay.vue'

import {
  createCanvas,
  drawFrame,
  drawPhoto,
  exportCanvas,
  destroyCanvas
} from '../services/canvas'

import { updateSubmission } from '../services/indexesdb'

const photoStore = usePhotoStore()
const sessionStore = useSessionStore()
const router = useRouter()
const url = 'https://en.wikipedia.org/wiki/Photography'

const previewIndex = ref(0)
let previewInterval = null

const previewPhoto = computed(() =>
  photoStore.filteredPhoto?.[previewIndex.value]
)

const countdown = ref(10)
const showQR = ref(false)
let countdownTimer = null

const resultImage = ref(null)
const showEmailModal = ref(false)


function startPreview() {
  previewInterval = setInterval(() => {
    previewIndex.value =
      (previewIndex.value + 1) % photoStore.filteredPhoto.length
  }, 700)
}

function stopPreview() {
  clearInterval(previewInterval)
  previewInterval = null
}


function startCountdown() {
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(countdownTimer)
      showQR.value = true
    }
  }, 1000)
}

async function generateFinalPhoto() {
  const frame = photoStore.selectedFrame
  const photos = photoStore.filteredPhoto

  destroyCanvas()
  createCanvas(frame.canvas.width, frame.canvas.height)

  for (let i = 0; i < frame.slots.length; i++) {
    await drawPhoto(photos[i], frame.slots[i])
  }

  await drawFrame(frame.image)

  resultImage.value = exportCanvas('image/jpeg', 1, 1)

  await updateSubmission(photoStore.currentSubmissionId, {
    finalPhoto: resultImage.value
  })
}


onMounted(async () => {
  if (!photoStore.filteredPhoto?.length) {
    router.push('/')
    return
  }

  startPreview()
  startCountdown()
  await generateFinalPhoto()
})

onUnmounted(() => {
  stopPreview()
  clearInterval(countdownTimer)
  destroyCanvas()
})

function next() {
  stopPreview()
  sessionStore.step = 'done'
  router.push('/done')
}
</script>
<template>
  <div class="relative w-screen h-screen bg-neutral-100 overflow-hidden">

    <div
      class="absolute top-0 left-0 w-full flex items-center justify-center"
      style="height: 80vh"
    >
      <div class="bg-white p-4 rounded-xl shadow h-full">
        <img
          v-if="previewPhoto"
          :src="previewPhoto"
          class="h-full object-contain transition-opacity duration-300"
        />
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 w-full flex flex-col items-center gap-4 pb-6"
    >
      <p
        v-if="!showQR"
        class="text-sm text-neutral-600"
      >
        QR akan muncul dalam {{ countdown }} detik
      </p>


      <QrDisplay
        v-if="showQR"
        :value="url"
      />

      <div class="flex flex-col items-center gap-2">
        <p class="text-xs text-neutral-500">
          Tidak mendapatkan QR?
        </p>

        <button
          @click="showEmailModal = true"
          class="px-6 py-2 rounded-full bg-black text-white"
        >
          Kirim ke Email
        </button>

        <button
          @click="next"
          class="px-6 py-2 rounded-full border border-black"
        >
          Finish
        </button>
      </div>
    </div>

    <EmailModal
  v-if="showEmailModal"
  @close="showEmailModal = false"
  @submit="handleEmail"
/>

  </div>
</template>
