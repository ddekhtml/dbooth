<script setup>
const emit = defineEmits(['pay'])
</script>

<template>
  <button
    @click="$emit('pay')"
    class="w-full bg-black text-white py-3 rounded-xl"
  >
    Bayar Sekarang
  </button>
</template>
