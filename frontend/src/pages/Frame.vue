<script setup>
import { useRouter } from 'vue-router'
import { frames } from '../config/frames'
import { useSessionStore } from '../stores/sessionStore'
import { usePhotoStore } from '../stores/photoStore'
import { getAllSubmissions, getSubmissionById, updateSubmission } from '../services/indexesdb'
import { ref, onMounted } from 'vue'

const router = useRouter()
const session = useSessionStore()
const photo = usePhotoStore()
const submissions = ref(null)

async function selectFrame(frame) {
  photo.setFrame(frame)
  await updateSubmission(photo.currentSubmissionId, {
    selectFrame: frame, 
  })
  session.setStep('photo')
  router.push('/camera')
}

onMounted( async () => {
  if (!photo.currentSubmissionId){
    session.setStep('home')
    router.push('/')
    return 
  }
  submissions.value = await getSubmissionById(photo.currentSubmissionId)
})

</script>

<template>
  <div>
    <h1>FRAME SELECT</h1>

    <h2>Available Frames</h2>

    <div v-for="frame in frames" :key="frame.id" style="margin-bottom: 24px; border: 1px solid #ccc; padding: 16px">
      <h3>{{ frame.name }}</h3>

      <img
        :src="frame.image"
        alt="frame preview"
        style="width: 240px; display: block; margin-bottom: 8px"
      />

      <!-- <p>Photo Count: {{ frame.photoCount }}</p> -->
<!-- 
      <pre>{{ frame }}</pre> -->

      <button @click="selectFrame(frame)">Select this frame</button>
    </div>

    <hr />
  </div>
</template>