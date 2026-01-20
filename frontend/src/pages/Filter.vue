<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { filters } from '../config/filters'
import { usePhotoStore } from '../stores/photoStore'
import { useSessionStore } from '../stores/sessionStore'

const router = useRouter()
const photoStore = usePhotoStore()
const sessionStore = useSessionStore()

const basePhoto = computed(() =>
  photoStore.rawPhotos.at(-1)
)

const activeFilter = computed(() =>
  filters.find(f => f.id === photoStore.selectedFilter)
)

function selectFilter(filter) {
  photoStore.setFilter(filter.id)
}

function next() {
  router.push('/result')
}
</script>


<template>
  <div class="p-6 space-y-6">

    <h1>FILTER</h1>

    <!-- PREVIEW UTAMA -->
    <div class="mx-auto" style="width: 80vw;">
      <img
        v-if="basePhoto"
        :src="basePhoto"
        class="w-full rounded-xl"
        :style="{ filter: activeFilter?.css }"
      />
    </div>

    <!-- FILTER VIA FOTO -->
    <div class="flex gap-4 overflow-x-auto py-4">
      <div
        v-for="filter in filters"
        :key="filter.id"
        class="shrink-0 cursor-pointer"
        @click="selectFilter(filter)"
      >
        <img
          :src="basePhoto"
          class="w-32 h-24 object-cover rounded-lg border-4"
          :style="{ filter: filter.css }"
          :class="{
            'border-black': filter.id === photoStore.selectedFilter,
            'border-transparent': filter.id !== photoStore.selectedFilter
          }"
        />
        <p class="text-center text-sm mt-1">{{ filter.name }}</p>
      </div>
    </div>

    <button
      @click="next"
      class="px-6 py-2 bg-black text-white rounded"
    >
      Next → Result
    </button>

    <hr />

    <!-- DEBUG -->
    <h2>Photo Store</h2>
    <pre>{{ photoStore }}</pre>

    <h2>Session Store</h2>
    <pre>{{ sessionStore }}</pre>

  </div>
</template>
