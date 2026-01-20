<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { usePhotoStore } from '../stores/photoStore'
import { useSessionStore } from '../stores/sessionStore'
import {
  createCanvas,
  drawFrame,
  drawPhoto,
  exportCanvas,
  destroyCanvas
} from '../services/canvas'

const sessionStore = useSessionStore()
const photoStore = usePhotoStore()
const resultImage = ref(null)

onMounted(async () => {
  const frame = photoStore.selectedFrame
  const photos = photoStore.filteredPhoto

  if (!frame || !photos.length) return

  // buat canvas
  createCanvas(frame.canvas.width, frame.canvas.height)

  // gambar foto ke slot
  for (let i = 0; i < frame.slots.length; i++) {
    await drawPhoto(photos[i], frame.slots[i])
  }

  // gambar frame PALING AKHIR
  await drawFrame(frame.image)

  // export
  resultImage.value = exportCanvas()
})

onUnmounted(() => {
  destroyCanvas()
})


</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-10 gap-6 bg-neutral-100">

    <!-- PREVIEW HASIL -->
    <div class="bg-white p-4 rounded-xl shadow">
      <img
        v-if="resultImage"
        :src="resultImage"
        class="w-[300px] object-contain"
      />
    </div>

    <!-- ACTION -->
    <div class="flex gap-4">
      <button
        class="px-6 py-2 rounded-full bg-black text-white opacity-50 cursor-not-allowed"
      >
        Email (coming soon)
      </button>

      <a
        v-if="resultImage"
        :href="resultImage"
        download="photobooth.png"
        class="px-6 py-2 rounded-full border border-black"
      >
        Download
      </a>
    </div>

  </div>
</template>
