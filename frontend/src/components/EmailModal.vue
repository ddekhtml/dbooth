<script setup>
import { ref } from 'vue'
import { sendPhotoboothEmail } from '../services/email'
import { usePhotoStore } from '../stores/photoStore'
const emit = defineEmits(['close'])
const props = defineProps({
    photo: {
        type: String, 
        required:true 
    }
})

const photoStore = usePhotoStore()

const userName = ref('')
const userEmail = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref(null)

async function sendEmail() {
  if (!userEmail.value) {
    error.value = 'Email wajib diisi'
    return
  }
  loading.value = true
  error.value = null
  try {
    await sendPhotoboothEmail({
      userName: userName.value || 'teman dbooth',
      userEmail: userEmail.value,
      photoUrl: props.photo
    })
    success.value = true
    } catch (err) {
    console.error('EMAILJS ERROR:', err)
    alert(err?.text || err?.message || 'Email gagal')
    } finally {
        loading.value = false
    }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 w-[320px]">
      
      <h3 class="text-lg font-semibold mb-4">
        Kirim ke Email 📩
      </h3>

      <div v-if="!success" class="flex flex-col gap-3">
        <input
          v-model="userName"
          placeholder="Nama (opsional)"
          class="border rounded px-3 py-2"
        />

        <input
          v-model="userEmail"
          placeholder="Email"
          class="border rounded px-3 py-2"
        />

        <p v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </p>

        <button
          @click="sendEmail"
          :disabled="loading"
          class="bg-black text-white rounded-full py-2"
        >
          {{ loading ? 'Mengirim...' : 'Kirim Email' }}
        </button>
      </div>

      <div v-else class="text-center">
        <p class="mb-4">Email berhasil dikirim!</p>
        <button
          @click="emit('close')"
          class="border rounded-full px-4 py-1"
        >
          Tutup
        </button>
      </div>

    </div>
  </div>
</template>
