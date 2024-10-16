import { defineStore } from 'pinia'
import routes from '@/router/menuRoutes'
import { useLanguage } from '@/modules/i18n'

export const useRouteStore = defineStore('routes', () => {
  const { t } = useLanguage()

  function constructRoutes(routes: Array<any>) {
    routes.forEach((route) => {
      route.label = t(`routerLabels.${route.meta.preset}`)
      if (route.children) {
        constructRoutes(route.children)
      }
    })
  }

  const menuRoutes: any = routes.find((route) => route.name === 'layout')?.children
  constructRoutes(menuRoutes)

  return {
    menuRoutes,
  }
})
