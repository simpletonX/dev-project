/* eslint-disable */
// @ts-nocheck
import app from '@/app'

export default <T>(params: T) => {
  app.config.globalProperties.$toast.add({
    life: 2000,
    ...params,
  })
}
