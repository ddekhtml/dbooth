<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-white">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
      
      <!-- Logo / Brand -->
      <h1 class="text-4xl font-bold text-pink-600 mb-2">
        DBOOTH
      </h1>
      <p class="text-gray-500 mb-8">
        Capture your moment
      </p>

      <!-- Illustration (optional) -->
      <div class="mb-8">
        <div class="w-32 h-32 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
          <span class="text-pink-500 text-5xl">📸</span>
        </div>
      </div>

      <!-- Start Button -->
      <button
        @click="start"
        class="w-full py-4 rounded-xl bg-pink-500 text-white text-lg font-semibold hover:bg-pink-600 transition"
      >
        Start Photo Session
      </button>

      <!-- Footer -->
      <p class="text-xs text-gray-400 mt-6">
        Powered by DBOOTH
      </p>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

function start() {
  router.push("/payment")
}
</script>
