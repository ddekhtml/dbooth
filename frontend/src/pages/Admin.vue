<script setup>
import { ref, onMounted } from 'vue'
import { getAllSubmissions } from '../services/indexesdb'
import { useSessionStore } from '../stores/sessionStore'

const datas = ref([])
const session = useSessionStore()
onMounted(async () => {
  datas.value = await getAllSubmissions()
})

</script>

<template>
  <div class="font-sunday text-center text-6xl text-maroon mt-8">
    {{ session.eventName }}
  </div>
  <div class="font-serif text-maroon text-right mt-3">
    {{ session.eventDate }}
  </div>
  
  <div class="font-serif text-md mt-3 overflow-x-auto">
  <table class="min-w-full border-y border-maroon text-left">
    <thead class="bg-maroon font-extralight text-bg">
      <tr>
        <th class="text-center">id</th>
        <th class="text-center">Created</th>
        <th class="text-center">Event</th>
        <th class="text-center">Filtered photo</th>
        <th class="text-center">Filter</th>
        <th class="text-center">Raw photos</th>
        <th class="text-center">Final photo</th>
        <th class="text-center">Email</th>
        <th class="text-center">Frame</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(item, index) in datas"
        :key="index"
        class="border-t"
      >
        <td>{{ item.id.slice(0,3) }}</td>
        <td class="text-center">
        {{
            new Date(item.created_at).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        })
        }}
        </td>
        <td>{{ item.event_name.slice(0,8) }}</td>
        <td>
            <div v-if="item.selected_frame">
                <img
                v-for="n in item.selected_frame.photoCount"
                :key="n"
                :src="item.filtered_photo"
                class="w-20"
            >
            </div>
            <div v-else>
                none
            </div>
        </td>
        <td>
            <p v-if="item.selected_filter">
                {{ item.selected_filter.id }}
            </p>
            <p v-else>null</p>
            
        </td>
        <td>
            <div v-if="item.selected_frame">
                <img
                v-for="n in item.selected_frame.photoCount"
                :key="n"
                :src="item.raw_photos"
                class="w-20"
            >
            </div>
            <div v-else>
                none
            </div>
        </td>
        <td>
            <img src="/frames/wedding/zidni-aike/grey.png" alt="null" class="w-20 my-2">
        </td>
        <td>
            <p v-if="item.email">
                 {{ item.email.slice(0,5) }}
            </p>
            <p v-else>null</p>
        </td>
        <td>
            <p v-if="item.selected_frame">
                {{ item.selected_frame.id }}
            </p>
            <p v-else>null</p>
            
        </td>
      </tr>
    </tbody>

  </table>
</div>

</template>
