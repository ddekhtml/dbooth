import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home.vue"
import Payment from "../pages/Payment.vue"
import Camera from "../pages/Camera.vue"
import Frame from "../pages/Frame.vue"
import Email from "../pages/Email.vue"
import Print from "../pages/Print.vue"
import Done from "../pages/Done.vue"

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/payment", name: "payment", component: Payment },
  { path: "/camera", name: "camera", component: Camera },
  { path: "/frame", name: "frame", component: Frame },
  { path: "/email", name: "email", component: Email },
  { path: "/print", name: "print", component: Print },
  { path: "/done", name: "done", component: Done }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
