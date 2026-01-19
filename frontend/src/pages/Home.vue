<template>
    <div>
        {{ session.step }}
        halo
        {{ session.isOffline }}
    </div>
</template>

<script setup>
   import { useSessionStore } from '../stores/sessionStore';
   import { usePhotoStore } from '../stores/photoStore';

   const session = useSessionStore()

</script>

<style scoped>

</style>