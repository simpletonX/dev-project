<template>
  <div class="brand-container">
    <div
      class="brand-table py-5 px-6 border-[1px] border-solid border-surface-200 dark:border-surface-800 rounded-lg bg-surface-0 dark:bg-surface-900"
    >
      <div class="table-header flex justify-between items-center">
        <div class="table-title text-lg">Brand Management</div>
        <div class="flex items-center">
          <Button @click="openAddBrandDialog" label="Add Brand" icon="pi pi-crown" />
        </div>
      </div>
    </div>

    <div
      class="brand-table px-6 pt-1 pb-6 border-[1px] border-solid border-surface-200 dark:border-surface-800 rounded-lg mt-4 bg-surface-0 dark:bg-surface-900"
    >
      <div class="table-content mt-5">
        <MyDataTable :data="productBrands" class="mb-5" :loading="loading">
          <Column field="logoUrl" header="Brand Logo">
            <template #body="{ data }">
              <div class="flex items-center py-1">
                <img :src="data.logoUrl" class="w-[40px] h-[40px] p-1 rounded-lg bg-surface-100 object-cover" />

                <div class="tm-name ml-5">
                  <div class="text-lg">{{ data.tmName }}</div>
                  <div class="text-sm text-surface-500">{{ data.createTime }}</div>
                </div>
              </div>
            </template>
          </Column>
          <Column field="logoUrl" header="Logo URL">
            <template #body="{ data }">
              <div class="w-[200px] truncate">{{ data.logoUrl }}</div>
            </template>
          </Column>
          <Column field="updateTime" header="Update Time"></Column>
          <Column field="operate" header="Other Operations">
            <template #body="{ data }">
              <Button text label="Changed" icon="pi pi-file-edit" @click="openEditBrandDialog(data)" />
              <Button text label="Delete" icon="pi pi-trash" severity="danger" @click="handleDeleteBrand(data.id)" />
              <!-- `Do you really want to delete the brand ${data.tmName}?` -->
            </template>
          </Column>
        </MyDataTable>
        <Pagination v-model:first="first" v-model:rows="rows" :totalRecords="total" @pageChange="requestList" />
      </div>
    </div>

    <MyDialog v-model:visible="addBrandVisible" title="Brand Management" width="420px" :loading="dialogLoading">
      <MyFormValidate :yupRules="formValidateRules" :init="formFields_" @submit="handleSubmit">
        <template #default="{ formFields, errors, onValidate }">
          <form class="form-container mt-2">
            <!-- Brand logo -->
            <MyImageUpload
              title="Brand Logo"
              :accept="['.jpg', '.jpeg', '.png', '.webp']"
              :size="4"
              :initSrc="formFields.logoUrl.value"
              v-model:src="formFields.logoUrl.value"
            />
            <div class="flex justify-center mt-2">
              <small class="text-red-500" v-if="errors.logoUrl">{{ errors.logoUrl }}</small>
            </div>

            <!-- Brand name -->
            <div class="flex flex-col gap-2 mt-6">
              <label for="username">Brand Name</label>
              <InputText id="username" v-model="formFields.tmName.value" placeholder="Please enter brand name" />
              <small class="text-red-500" v-if="errors.tmName">{{ errors.tmName }}</small>
              <small id="username-help" v-else>Enter brand name</small>
            </div>
            <div class="mt-10 flex justify-end">
              <Button class="mr-2" outlined @click="addBrandVisible = false">Cancel</Button>
              <Button type="submit" @click="onValidate">{{ formFields_.id ? 'Update' : 'Add' }}</Button>
            </div>
          </form>
        </template>
      </MyFormValidate>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { getBrandList, insertBrand, updateBrand, deleteBrand } from '@/api/product/brand'
import { BrandItem } from '@/api/product/brand/types'
import toast from '@/utils/primevue-service/toast'
import { confirmDialogService } from '@/services/confirmDialogService'

const productBrands = ref<BrandItem[]>([])
const total = ref(0)
const first = ref(0)
const rows = ref(5)
const current = computed(() => Math.floor(first.value / rows.value) + 1)
const loading = ref(false)

async function requestList() {
  try {
    loading.value = true
    const res = await getBrandList(current.value, rows.value)
    productBrands.value = res.data.records
    total.value = res.data.total
  } catch (error) {
    loading.value = false
  } finally {
    loading.value = false
  }
}

import * as yup from 'yup'
const formValidateRules = ref<Record<string, any>>({
  logoUrl: yup.string().url('Please enter a valid URL').required('Logo URL is required').default(''),
  tmName: yup.string().required('Brand name is required').min(2, 'Brand name must be at least 2 characters').default(''),
})
const formFields_ = ref<Record<string, any>>({})
const addBrandVisible = ref(false)
const dialogType = ref('insert')
function openAddBrandDialog() {
  formFields_.value = {
    logoUrl: '',
    tmName: '',
  }
  dialogType.value = 'insert'
  addBrandVisible.value = true
}
function openEditBrandDialog(data: BrandItem) {
  formFields_.value = {
    id: data.id,
    logoUrl: data.logoUrl,
    tmName: data.tmName,
  }
  dialogType.value = 'edit'
  addBrandVisible.value = true
}

onMounted(() => requestList())

const dialogLoading = ref(false)
async function handleSubmit(formFields: BrandItem) {
  const api = dialogType.value === 'insert' ? insertBrand : updateBrand

  dialogLoading.value = true
  try {
    await api(formFields)
    toast({
      severity: 'success',
      summary: 'Success',
      message: 'Operation completed successfully',
    })
    requestList()
  } catch (error) {
  } finally {
    setTimeout(() => {
      addBrandVisible.value = false
      dialogLoading.value = false
    }, 500)
  }
}
async function handleDeleteBrand(id: number) {
  confirmDialogService.show().onConfirm(async () => {
    try {
      await deleteBrand(id)
      toast({
        severity: 'success',
        summary: 'Success',
        message: 'Operation completed successfully',
      })
      requestList()
    } catch (error) {
    } finally {
      confirmDialogService.confirmDone()
    }
  })
}
</script>
