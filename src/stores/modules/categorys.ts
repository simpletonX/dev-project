import { defineStore } from 'pinia'
import type { CategoryItem } from '@/api/product/categorys/types'
import { getCategory1 } from '@/api/product/categorys'

export const useCategoryStore = defineStore('categorys', () => {
  const firstCategorys = ref<CategoryItem[]>([])

  async function getFirstCategorys() {
    const res = await getCategory1()
    firstCategorys.value = res.data || []
  }

  return {
    firstCategorys,
    getFirstCategorys,
  }
})
