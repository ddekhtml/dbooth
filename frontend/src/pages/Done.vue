<template>
    <div>
        <h2>Session Store</h2>
    <pre>{{ sessionStore }}</pre>
        <img :src="photoStore.finalPhoto" v-if="photoStore.finalPhoto" alt="">
    <!-- <h2>Photo Store</h2>
    <pre>{{ photoStore }}</pre> -->

    </div>
</template>
<script setup>
    import { usePhotoStore } from '../stores/photoStore';
    import { useSessionStore } from '../stores/sessionStore';

   
   const photoStore = usePhotoStore()
   const sessionStore = useSessionStore()
</script>

<style scoped>

</style>