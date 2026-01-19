<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import { usePhotoStore } from '../stores/photoStore'

const router = useRouter()
const session = useSessionStore()
const photo = usePhotoStore()

function goToFrame() {
  session.setStep('frame')
  router.push('/frame')
}

function resetAll() {
  session.resetSession()
  photo.reset()
}
</script>

<template>
  <div>
    <h1>HOME</h1>

    <h2>Session Store</h2>
    <pre>{{ session }}</pre>

    <h2>Photo Store</h2>
    <pre>{{ photo }}</pre>

    <button @click="goToFrame">Go to Frame Select</button>
    <br>
    <button @click="resetAll">Reset Session</button>
  </div>
</template>
