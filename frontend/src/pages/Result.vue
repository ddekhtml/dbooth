<script setup>
   import { useSessionStore } from '../stores/sessionStore';
   import { usePhotoStore } from '../stores/photoStore';
   import { onMounted } from 'vue'
   import { useRouter } from 'vue-router';

   const sessionStore = useSessionStore()
   const photoStore = usePhotoStore()
   const router= useRouter()
</script>

<template>
    <div>
        <h2>Photo Store</h2>
        <pre>{{ photoStore }}</pre>

        <h2>Session Store</h2>
        <pre>{{ sessionStore }}</pre>

    </div>
</template>

<style scoped>

</style>