/* eslint-disable */
// @ts-nocheck
import app from '@/main'

export default <T>(params: T) => {
  app.config.globalProperties.$toast.add({
    life: 2000,
    ...params,
  })
}
