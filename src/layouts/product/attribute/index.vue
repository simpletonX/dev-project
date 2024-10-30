<template>
  <div class="attribute-container">
    <div class="header flex justify-between items-center">
      <div
        class="classification w-[32.5%] rounded-lg border dark:border-surface-800 bg-surface-0 dark:bg-surface-900 p-6"
        v-for="(item, index) in categoryAreas"
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

    <div
      class="main rounded-lg border dark:border-surface-800 bg-surface-0 dark:bg-surface-900 h-[500px] mt-5 p-6"
    >
      <div class="title-bar flex justify-between items-center mb-8">
        <span class="text-lg">Attribute Management</span>
        <Button outlined label="Add Attribute" icon="pi pi-plus" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCategory1, getCategory2, getCategory3 } from '@/api/product/categorys'
import type { CategoryItem } from '@/api/product/categorys/types'

const categoryAreas = ref<
  {
    label: string
    value: number | null
    options: CategoryItem[]
  }[]
>([
  {
    label: 'Classification 1',
    value: null,
    options: [],
  },
  {
    label: 'Classification 2',
    value: null,
    options: [],
  },
  {
    label: 'Classification 3',
    value: null,
    options: [],
  },
])

async function getCategoryOptions(index: number, item: any) {
  const apis = [getCategory1, getCategory2, getCategory3]
  if (index < categoryAreas.value.length) {
    const res = await apis[index](item.value as number)
    categoryAreas.value[index].options = res.data
  }
}

onMounted(async () => {
  const res = await getCategory1()
  categoryAreas.value[0].options = res.data
})
</script>
