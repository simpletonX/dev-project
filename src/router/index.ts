// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-nocheck
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './menuRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

import { useUserStore } from '@/stores/modules/user'
import pinia from '@/stores'
import NProgress from 'nprogress'
import i18n from '@/utils/i18n'

NProgress.configure({ speed: 400, trickleSpeed: 800 })
router.beforeEach(async (to: any, from: any, next: any) => {
  if (to.meta.preset) {
    document.title = i18n.global.t(`routerLabels.${to.meta.preset}`)
  }

  NProgress.start()
  const whiteList = ['/login', '/404']
  if (whiteList.includes(to.path)) {
    next()
    return NProgress.done()
  }

  const userStore = useUserStore(pinia)
  const token = userStore.token
  const userInfo = userStore.userInfo
  if (token) {
    // !Object.keys(userInfo).length && (await userStore.getInfoAction())
    next()
  } else {
    next('/login')
  }
  NProgress.done()
})

export default router
