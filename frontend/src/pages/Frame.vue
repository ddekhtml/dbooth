<script setup>
import { useRouter } from 'vue-router'
import { frames } from '../config/frames'
import { useSessionStore } from '../stores/sessionStore'
import { usePhotoStore } from '../stores/photoStore'

const router = useRouter()
const session = useSessionStore()
const photo = usePhotoStore()

function selectFrame(frame) {
  photo.setFrame(frame)
  session.setStep('photo')
  router.push('/camera')
}
</script>

<template>
  <div>
    <h1>FRAME SELECT (DEBUG MODE)</h1>

    <h2>Available Frames (Config)</h2>

    <div v-for="frame in frames" :key="frame.id" style="margin-bottom: 24px; border: 1px solid #ccc; padding: 16px">
      <h3>{{ frame.name }} ({{ frame.id }})</h3>

      <img
        :src="frame.image"
        alt="frame preview"
        style="width: 240px; display: block; margin-bottom: 8px"
      />

      <p>Photo Count: {{ frame.photoCount }}</p>

      <pre>{{ frame }}</pre>

      <button @click="selectFrame(frame)">Select this frame</button>
    </div>

    <hr />

    <h2>Session Store</h2>
    <pre>{{ session }}</pre>

    <h2>Photo Store</h2>
    <pre>{{ photo }}</pre>
  </div>
</template>