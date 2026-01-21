<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoStore } from '../stores/photoStore'
import { useSessionStore } from '../stores/sessionStore'

const router = useRouter()

const countdown = ref(5)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    countdown.value--

    if (countdown.value <= 0) {
      clearInterval(timer)
      router.push('/')
    }
  }, 1000)
})

onUnmounted(() => {
    usePhotoStore().resetAll()
    useSessionStore().resetSession()
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col items-center justify-center bg-neutral-100 text-center"
  >
    <div class="bg-white px-8 py-10 rounded-2xl shadow-lg space-y-4">
      <h1 class="text-2xl font-semibold">Selesai 🎉</h1>

      <p class="text-gray-600">
        Terima kasih sudah menggunakan photobooth kami
      </p>

      <p class="text-sm text-gray-500">
        Kembali ke home dalam
      </p>

      <div class="text-4xl font-bold">
        {{ countdown }}
      </div>
    </div>
  </div>
</template>
