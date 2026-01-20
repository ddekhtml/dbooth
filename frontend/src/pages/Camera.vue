<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

import Countdown from '../components/Countdown.vue'
import { startCamera, capturePhoto, stopCamera } from '../services/camera'

import { usePhotoStore } from '../stores/photoStore'
import { useSessionStore } from '../stores/sessionStore'

const router = useRouter()
const photoStore = usePhotoStore()
const sessionStore = useSessionStore()

const videoRef = ref(null)
const countdown = ref(0)
const isCapturing = ref(false)

const maxPhotos = computed(() =>
  Number(photoStore.selectedFrame?.photoCount || 1)
)

onMounted(() => {
  if (!photoStore.selectedFrame) {
    router.push('/frame')
    return
  }
  startCamera(videoRef.value)
})

onBeforeUnmount(() => {
  stopCamera()
})

async function startCapture() {
  if (isCapturing.value) return
  isCapturing.value = true

  for (let i = photoStore.rawPhotos.length; i < maxPhotos.value; i++) {
    await runCountdown()
    const photo = capturePhoto(videoRef.value)
    photoStore.addRawPhoto(photo)
  }
  sessionStore.step="filter"
  router.push('/filter')
}

function runCountdown() {
  return new Promise(resolve => {
    countdown.value = 5
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(timer)
        resolve()
      }
    }, 1000)
  })
}
</script>

<template>
  <div class="p-6 space-y-6">

    <h1>CAMERA</h1>
    <div class="relative mx-auto" style="width: 80vw;">
      <video
        ref="videoRef"
        autoplay
        playsinline
        class="w-full rounded-xl bg-black"
      />
      <Countdown :value="countdown" />
    </div>
    <button v-if="!isCapturing"
      @click="startCapture"
      class="px-6 py-2 bg-black text-white rounded"
    >
      Start Capture
    </button>

    <div class="flex gap-4 flex-wrap">
      <div
        v-for="(photo, i) in photoStore.rawPhotos"
        :key="i"
      >
        <img
          :src="photo"
          class="w-48 border"
        />
        <p>Photo {{ i + 1 }}</p>
      </div>
    </div>

    <hr />

    <h2>Photo Store</h2>
    <pre>{{ photoStore }}</pre>

    <h2>Session Store</h2>
    <pre>{{ sessionStore }}</pre>

  </div>
</template>
