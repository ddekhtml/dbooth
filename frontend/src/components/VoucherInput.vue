<script setup>
import { ref } from 'vue'
import { validateVoucher } from '../services/voucher'

const emit = defineEmits(['applied'])

const code = ref('')
const error = ref('')

function apply() {
  const result = validateVoucher(code.value)

  if (!result) {
    error.value = 'Voucher tidak valid'
    return
  }

  error.value = ''
  emit('applied', result)
}
</script>

<template>
  <div class="space-y-2">
    <input
      v-model="code"
      placeholder="Kode voucher"
      class="w-full border rounded px-3 py-2"
    />

    <button
      @click="apply"
      class="w-full bg-gray-800 text-white py-2 rounded"
    >
      Pakai Voucher
    </button>

    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>
