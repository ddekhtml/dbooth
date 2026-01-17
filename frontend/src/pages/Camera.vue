<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { startCamera, stopCamera, capturePhoto } from '../services/camera'

const router = useRouter()

const videoRef = ref(null)
const countdown = ref(0)
const photos = ref([])
const currentPreview = ref(null)

const TOTAL_PHOTO = 3

onMounted(async () => {
  await startCamera(videoRef.value)
})

onBeforeUnmount(() => {
  stopCamera()
})

async function startCapture() {
  photos.value = []

  for (let i = 0; i < TOTAL_PHOTO; i++) {
    // 1️⃣ countdown 5 detik
    await runCountdown(5)

    // 2️⃣ ambil foto
    const photo = capturePhoto(videoRef.value)
    if (!photo) {
      i--
      continue
    }

    // 3️⃣ tampilkan preview besar
    currentPreview.value = photo

    // 4️⃣ tunggu 3 detik
    await wait(3000)

    // 5️⃣ simpan ke bawah
    photos.value.push(photo)
    currentPreview.value = null
  }

  // 6️⃣ ke frame
  router.push({
    name: 'frame',
    state: { photos: photos.value }
  })
}

function runCountdown(seconds) {
  return new Promise(resolve => {
    countdown.value = seconds
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(timer)
        resolve()
      }
    }, 1000)
  })
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>

<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center gap-6">

    <!-- CAMERA / PREVIEW -->
    <div class="relative w-[760px] h-[500px] rounded-2xl overflow-hidden">

      <!-- LIVE CAMERA (SELALU ADA) -->
      <video
        ref="videoRef"
        autoplay
        muted
        playsinline
        class="absolute inset-0 object-cover scale-x-[-1]"
        :class="currentPreview ? 'opacity-0' : 'opacity-100'"
      />

      <!-- PHOTO PREVIEW -->
      <img
        v-if="currentPreview"
        :src="currentPreview"
        class="absolute inset-0 object-cover"
      />

      <!-- COUNTDOWN -->
      <div
        v-if="countdown > 0"
        class="absolute inset-0 flex items-center justify-center
               bg-black/50 text-white text-8xl font-bold"
      >
        {{ countdown }}
      </div>
    </div>

    <!-- BUTTON -->
    <button
      @click="startCapture"
      class="px-10 py-3 bg-white text-black rounded-full text-lg"
    >
      Start Photo
    </button>

    <!-- THUMBNAILS -->
    <div class="flex gap-4 mt-4">
      <img
        v-for="(photo, i) in photos"
        :key="i"
        :src="photo"
        class="w-40 h-28 object-cover rounded-lg border border-white"
      />
    </div>

  </div>
</template>
