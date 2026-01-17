<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ambil data dari history state
const photos = ref(history.state?.photos || [])

function backToCamera() {
  router.push({ name: 'camera' })
}
</script>

<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

    <h1 class="text-3xl font-semibold">Photo Result</h1>

    <!-- FOTO HASIL -->
    <div class="flex gap-6">
      <img
        v-for="(photo, index) in photos"
        :key="index"
        :src="photo"
        class="w-[240px] h-[360px] object-cover rounded-xl border border-white"
      />
    </div>

    <!-- BUTTON -->
    <button
      @click="backToCamera"
      class="mt-6 px-8 py-3 bg-white text-black rounded-full"
    >
      Retake
    </button>

  </div>
</template>
