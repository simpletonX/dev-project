import { ResponseData } from '@/api/types'

export interface BrandItem {
  id: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}
// 品牌分页列表ResponseData
export interface BrandListResponseData extends ResponseData {
  data: {
    records: BrandItem[]
    total: number
    size?: number
    current?: number
    orders?: any[]
    optimizeCountSql?: boolean
    hitCount?: boolean
    countId?: null
    maxLimit?: null
    searchCount?: boolean
    pages?: number
  }
}

// 新增&修改品牌的请求体
export interface BrandBodyData {
  id?: number
  tmName: string
  logoUrl: string
}
