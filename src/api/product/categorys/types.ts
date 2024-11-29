import type { ResponseData } from '@/api/types'

export interface CategoryItem {
  id: number | string
  name: string
  updateTime: string
  createTime: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryListResponseData extends ResponseData {
  data: Array<CategoryItem>
}
