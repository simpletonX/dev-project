import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './menuRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
