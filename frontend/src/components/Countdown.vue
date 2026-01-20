<script setup>
defineProps({
  value: Number
})
</script>

<template>
  <div
    v-if="value > 0"
    class="absolute inset-0 flex items-center justify-center
           bg-black/40 text-white text-8xl font-bold"
  >
    {{ value }}
  </div>
</template>
