import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Frame from '../pages/Frame.vue'
import Camera from '../pages/Camera.vue'
import Filter from '../pages/Filter.vue'
import Result from '../pages/Result.vue'
import Done from '../pages/Done.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/frame',
    name: 'frame',
    component: Frame
  },
  {
    path: '/camera',
    name: 'camera',
    component: Camera
  },
  {
    path: '/filter',
    name: 'filter',
    component: Filter
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/done',
    name: 'done',
    component: Done
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
