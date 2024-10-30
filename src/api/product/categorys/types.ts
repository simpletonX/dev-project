import type { ResponseData } from '@/api/types'

export interface CategoryItem {
  id: number
  name: string
  updateTime: string
  createTime: string
}

export interface CategoryListResponseData extends ResponseData {
  data: Array<CategoryItem>
}
