<script setup>
import { ref,computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { filters } from '../config/filters'
import { usePhotoStore } from '../stores/photoStore'
import { useSessionStore } from '../stores/sessionStore'
import { applyFilterToImage } from '../services/filter'
import { getSubmissionById, updateSubmission } from '../services/indexesdb'

const router = useRouter()
const photoStore = usePhotoStore()
const sessionStore = useSessionStore()
const submissions = ref(null)
const previewPhoto = computed(() =>
  photoStore.rawPhotos.at(-1)
)
const activeFilter = computed(() =>
  filters.find(f => f.id === photoStore.selectedFilter)
)
function selectFilter(filter) {
  photoStore.setFilter(filter.id)
}
async function next() {
  const result = []
    for (const photo of photoStore.rawPhotos) {
        const filtered = await applyFilterToImage(
        photo,
        activeFilter.value?.css || ''
        )
        result.push(filtered)
    }
  photoStore.setFilteredPhotos(result)
  await updateSubmission(photoStore.currentSubmissionId, {
    filteredPhoto: result, 
    selectedFilter: activeFilter.value 
  })
  sessionStore.step = 'result'
  router.push('/result')
}
onMounted(async() => {
  if (!photoStore.currentSubmissionId){
    sessionStore.setStep('home')
    router.push('/')
    return 
  }
  if (!photoStore.selectedFrame) {
    sessionStore.setStep('frame')
    router.push('/frame')
    return
  }
  if (photoStore.selectedFrame.slots.length > photoStore.rawPhotos.length ){
    sessionStore.setStep('camera')
    router.push('/camera')
    return 
  }
  // submissions.value= await getSubmissionById(photoStore.currentSubmissionId)
  // photoStore.resetRawPhotos()
  // photoStore.setRawPhotos(submission.rawPhotos)
})

</script>
<template>
  <!-- {{ submissions }} -->
  <div class="p-6 space-y-6">
    <h1>FILTER</h1>

    <!-- PREVIEW BESAR -->
    <div class="mx-auto" style="width: 80vw;">
      <img
        v-if="previewPhoto"
        :src="previewPhoto"
        class="w-full rounded-xl"
        :style="{ filter: activeFilter?.css }"
      />
    </div>

    <!-- PILIH FILTER -->
    <div
    class="flex flex-row gap-4 overflow-x-auto overflow-y-hidden py-4
            whitespace-nowrap"
    >
    <div
        v-for="filter in filters"
        :key="filter.id"
        class="inline-flex flex-col items-center shrink-0 cursor-pointer"
        @click="selectFilter(filter)"
    >
        <img
        :src="previewPhoto"
        class="w-32 h-24 object-cover rounded border-4"
        :style="{ filter: filter.css }"
        :class="{
            'border-black': filter.id === photoStore.selectedFilter,
            'border-transparent': filter.id !== photoStore.selectedFilter
        }"
        />
        <p class="text-center text-sm mt-1">{{ filter.name }}</p>
    </div>
    </div>


    <button @click="next" class="px-6 py-2 bg-black text-white rounded">
      Next → Result
    </button>

    <hr />

    <!-- DEBUG
    <pre>{{ photoStore }}</pre>
    <pre>{{ sessionStore }}</pre> -->
  </div>
</template>
