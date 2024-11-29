<template>
  <div class="header flex justify-between items-center">
    <div
      class="classification w-[32.5%] rounded-lg border dark:border-surface-800 bg-surface-0 dark:bg-surface-900 p-6"
      v-for="(item, index) in props.modelValue"
      :key="index"
    >
      <div class="title text-surface-500 mb-3">{{ item.label }}</div>
      <Select
        v-model="item.value"
        :options="item.options"
        optionValue="id"
        optionLabel="name"
        placeholder="Select classification"
        class="w-full max-w-[210px]"
        @change="getCategoryOptions(index + 1, item)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCategory1, getCategory2, getCategory3 } from '@/api/product/categorys'
import type { CategoryItem } from '@/api/product/categorys/types'

const props = defineProps<{
  modelValue: {
    label: string
    value: number | null
    options: CategoryItem[]
  }[]
  ids: string
}>()
const emits = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
  'update:ids': [value: string]
  change: [string, value: typeof props.modelValue]
}>()

async function getCategoryOptions(index: number, item: { value: number | null }) {
  const apis = [getCategory1, getCategory2, getCategory3]
  let newmodelValue = [...props.modelValue]

  if (index < props.modelValue.length) {
    const res = await apis[index](item.value as number)
    newmodelValue[index].options = res.data
    newmodelValue[index].value = null

    if (index === 1) {
      newmodelValue[2].value = null
      newmodelValue[2].options = []
    }
    emits('update:ids', '')
    return emits('update:modelValue', newmodelValue)
  }
  const ids = newmodelValue
    .map((el) => el.value)
    .filter(Boolean)
    .join('/')
  emits('change', ids, newmodelValue)
  emits('update:ids', ids)
}

onMounted(async () => {
  const res = await getCategory1()

  const newmodelValue = [...props.modelValue]
  newmodelValue[0].options = res.data
  emits('update:modelValue', newmodelValue)
})
</script>
