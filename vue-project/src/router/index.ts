// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Status from '@/components/Status.vue'

const routes = [
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
]

const router = createRouter({
  history: createWebHistory(), // ou createWebHashHistory()
  routes
})

export default router
