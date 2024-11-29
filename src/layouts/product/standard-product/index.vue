<template>
  <div class="spu-page">
    <ProductCategorys v-model="categoryList" v-model:ids="categoryIds" @change="categoryChange" />

    <div class="main rounded-lg border dark:border-surface-800 bg-surface-0 dark:bg-surface-900 mt-5 p-6">
      <div class="title-bar flex justify-between items-center mb-8">
        <span class="text-lg">SPU Management</span>
        <Button
          outlined
          label="Add Standard Product Unit"
          icon="pi pi-plus"
          :disabled="!categoryIds"
          @click="openDialog('insert')"
        />
      </div>

      <MyDataTable :data="spuList" :loading="loading" @refresh="requestlist(categoryIds)">
        <Column header="No.">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column field="spuName" header="spuName"></Column>
        <Column field="description" header="description" class="max-w-[300px]">
          <template #body="{ data }">
            <div class="description truncate" :title="data.description">
              {{ data.description }}
            </div>
          </template>
        </Column>
        <Column field="operate" header="Operations">
          <template #body="{ data }">
            <span hidden>{{ data }}</span>

            <Button text icon="pi pi-plus" />
            <Button text icon="pi pi-file-edit" />
            <Button text icon="pi pi-exclamation-circle" />
            <Button text icon="pi pi-trash" severity="danger" />
          </template>
        </Column>
      </MyDataTable>
      <Pagination
        v-model:first="first"
        v-model:rows="rows"
        :totalRecords="total"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        @pageChange="requestlist(categoryIds)"
      />

      <DetailsDialog v-model:visible="visible" :loading="dialogLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBrandList } from '@/api/product/spu'
import type { CategoryItem } from '@/api/product/categorys/types'
import type { recordItem } from '@/api/product/spu/types'
import DetailsDialog from './components/DetailsDialog.vue'

const categoryList = ref<
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
const testCategoryIds = ref('2/13/61')
const categoryIds = ref(testCategoryIds.value)
const spuList = ref<recordItem[]>([])
const loading = ref(false)
const total = ref(0)
const rows = ref(10)
const first = ref(0)
const current = computed(() => Math.floor(first.value / rows.value) + 1)
const visible = ref(false)
const dialogLoading = ref(false)
/**
 * 界面交互 ---------------------------- >
 */
function openDialog(type: 'insert' | 'update') {
  console.log(type)
}

/**
 * 异步请求 ---------------------------- >
 */
async function requestlist(categoryIds: string) {
  if (!categoryIds) return

  loading.value = true
  try {
    const res = await getBrandList(current.value, rows.value, parseInt(categoryIds.split('/')[2]))
    spuList.value = res.data.records
    total.value = res.data.total
  } catch {
  } finally {
    loading.value = false
  }
}
async function categoryChange(categoryIds: string) {
  requestlist(categoryIds)
}

/**
 * 测试 ---------------------------- >
 */
onMounted(() => {
  // requestlist(testCategoryIds.value)
})
</script>
