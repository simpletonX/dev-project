import type { ResponseData } from '@/api/types'

export interface AttributeItem {
  id: number | string
  createTime: string
  updateTime: string
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: Array<{
    id: number | string
    createTime: string
    updateTime: string
    valueName: string
    attrId: number
  }>
}

export interface AttributeListResponseData extends ResponseData {
  data: AttributeItem[]
}

export interface AttributeRequestData {
  id?: number | string
  attrName: string
  attrValueList: Array<{
    valueName: string
  }>
  categoryId: number
  categoryLevel: number
}
