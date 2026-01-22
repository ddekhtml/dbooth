<script setup>
import QrcodeVue from 'qrcode.vue'

defineProps({
  value: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow">
    <QrcodeVue
      :value="`https://dbooth.netlify.app/${value}`"
      :size="180"
      level="H"
    />
    <p class="text-xs text-center mt-2 text-neutral-500">
      Scan untuk download foto
    </p>
  </div>
</template>
