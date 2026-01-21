<script setup>
import { ref } from 'vue'
import { updateSubmission } from '../services/indexesdb'
import { usePhotoStore } from '../stores/photoStore'

const emit = defineEmits(['close', 'submit'])

const email = ref('')
const error = ref('')

async function submitEmail() {
  if (!email.value) {
    error.value = 'Email wajib diisi'
    return
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  if (!isValid) {
    error.value = 'Format email tidak valid'
    return
  }
  await updateSubmission(usePhotoStore().currentSubmissionId, {
    email: email.value 
  })
  emit('submit', email.value)
  emit('close')
}
</script>

<template>
  <!-- BACKDROP -->
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <!-- MODAL -->
    <div class="bg-white rounded-2xl w-[90%] max-w-sm p-6 space-y-4">

      <h2 class="text-lg font-semibold text-center">
        Kirim ke Email
      </h2>

      <p class="text-sm text-neutral-500 text-center">
        Masukkan email untuk menerima foto
      </p>

      <input
        v-model="email"
        type="email"
        placeholder="email@example.com"
        class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />

      <p v-if="error" class="text-sm text-red-500">
        {{ error }}
      </p>

      <div class="flex gap-3 pt-2">
        <button
          @click="$emit('close')"
          class="flex-1 py-2 rounded-xl border"
        >
          Batal
        </button>

        <button
          @click="submitEmail"
          class="flex-1 py-2 rounded-xl bg-black text-white"
        >
          Kirim
        </button>
      </div>
    </div>
  </div>
</template>
