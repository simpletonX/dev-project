<template>
  <div class="attribute-container">
    <ProductCategorys v-model="categoryList" v-model:ids="categoryIds" @change="categoryChange" />
    <div class="main rounded-lg border dark:border-surface-800 bg-surface-0 dark:bg-surface-900 mt-5 p-6">
      <div class="title-bar flex justify-between items-center mb-8">
        <span class="text-lg">Attribute Management</span>
        <Button outlined label="Add Attribute" icon="pi pi-plus" :disabled="!categoryIds" @click="openDialog('insert')" />
      </div>

      <MyDataTable :data="attrList" :loading="loading" @refresh="getAttributeList(categoryIds)">
        <Column header="No.">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column field="attrName" header="Name"></Column>
        <Column field="attrValueList" header="Values" class="max-w-[300px]">
          <template #body="slotProps">
            <Tag
              :severity="index % 2 === 0 ? 'info' : 'success'"
              v-for="(item, index) in slotProps.data.attrValueList"
              :key="index"
              class="mr-2 mb-1"
              >{{ item.valueName }}</Tag
            >
          </template>
        </Column>
        <Column field="operate" header="Operations">
          <template #body="{ data }">
            <Button text label="Edit" icon="pi pi-file-edit" @click="openDialog('update', data)" />
            <Button text label="Delete" icon="pi pi-trash" severity="danger" @click="deleteAttribute(data.id)" />
          </template>
        </Column>
      </MyDataTable>

      <MyDialog v-model:visible="visible" title="Details editing" width="460px" content-class="mt-3" :loading="dialogLoading">
        <form @submit="onSubmit">
          <MyInputItem
            label="Attribute name"
            v-model="formFields.attrName"
            placeholder="Please enter the attribute name"
            :error="errors.attrName"
          />
          <MyInputItem label="Attribute values" :error="errors.attrValueList">
            <div class="mt-3 mb-2">
              <MyDynamicTagGroup
                v-model:group="formFields.attrValueList"
                v-model:focusIndex="focusIndex"
                :popoverOptions="popoverOptions"
                labelKey="valueName"
                @command="popoverCommand($event, formFields)"
                @focus="markPopoverTarget"
                @insert="insertAttrValue"
              />
            </div>
          </MyInputItem>
          <MyFullButton />
        </form>
      </MyDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CategoryItem } from '@/api/product/categorys/types'
import {
  getAttributeList as getAttributeListApi,
  insertAttribute as insertAttributeApi,
  deleteAttribute as deleteAttributeApi,
} from '@/api/product/attribute'
import { AttributeItem, AttributeRequestData } from '@/api/product/attribute/types'
import MyDataTable from '@/components/MyDataTable.vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import toast from '@/utils/primevue-service/toast'
import { confirmDialogService } from '@/services/confirmDialogService'

/**
 * 分类/数据列表/dialog相关逻辑 ---------------------------- >
 */
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
const visible = ref(false)
const dialogType = ref<'insert' | 'update'>('insert')
const loading = ref(false)
const dialogLoading = ref(false)
const attrList = ref<AttributeItem[]>([])
const categoryIds = ref('')

/**
 * detail表单相关逻辑 ---------------------------- >
 */
const schema = yup.object({
  attrName: yup.string().required('Attribute name is required'),
  attrValueList: yup
    .array()
    .of(
      yup.object({
        valueName: yup.string().required('Attribute value is required'),
      })
    )
    .min(1, 'At least one attribute value is required'),
})

const initialValues: AttributeRequestData = {
  id: '',
  attrName: '',
  attrValueList: [],
  categoryId: 0,
  categoryLevel: 3,
}
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues,
})

const onSubmit = handleSubmit((values) => {
  // 提交insert/update请求
  insertAttribute(values)
})

const [id] = defineField('id')
const [attrName] = defineField('attrName')
const [attrValueList] = defineField('attrValueList')
const [categoryId] = defineField('categoryId')
const formFields = reactive({
  id,
  attrName,
  attrValueList,
  categoryId,
  categoryLevel: 3,
})

const popoverOptions = ref([
  {
    label: 'Modify',
    fontAwesomeFont: ['fas', 'file-pen'],
  },
  {
    label: 'Delete',
    fontAwesomeFont: ['fas', 'delete-left'],
    fontAwesomeFontClass: 'text-red-400',
    labelClass: 'text-red-400',
  },
])
const focusTagItem = ref<{ valueName: string } | null>(null)
const focusIndex = ref(-1)
const newIndexTotal = ref(0)
function openDialog(type: 'insert' | 'update', item?: AttributeItem) {
  dialogType.value = type
  visible.value = true

  if (item) {
    Object.keys(formFields).forEach((key) => {
      formFields[key] = item[key]
    })
    return
  }
  Object.keys(formFields).forEach((key) => {
    formFields[key] = initialValues[key]
  })
}
function markPopoverTarget(item: { valueName: string }) {
  focusTagItem.value = item
}
function popoverCommand(label: string, formFields: AttributeRequestData) {
  switch (label) {
    case 'Modify':
      focusIndex.value = formFields.attrValueList.findIndex((item) => item.valueName === focusTagItem.value?.valueName)
      break
    case 'Delete':
      formFields.attrValueList = formFields.attrValueList.filter((item) => item.valueName !== focusTagItem.value?.valueName)
      break
  }
}
function insertAttrValue() {
  newIndexTotal.value++
  formFields.attrValueList.push({ valueName: `new-${newIndexTotal.value}` })
  focusIndex.value = formFields.attrValueList.length - 1
}

/**
 * 异步请求 ---------------------------- >
 */
async function getAttributeList(categoryIds: string) {
  if (!categoryIds) return

  loading.value = true
  try {
    const res = await getAttributeListApi(categoryIds)
    attrList.value = res.data
  } catch {
  } finally {
    loading.value = false
  }
}
async function categoryChange(categoryIds: string) {
  getAttributeList(categoryIds)
}
async function insertAttribute(params: AttributeRequestData) {
  try {
    dialogLoading.value = true
    await insertAttributeApi({
      ...params,
      categoryId: +categoryIds.value.split('/')[2],
    })
    toast({
      severity: 'success',
      summary: `Operation successful`,
      closable: false,
    })
  } catch {
  } finally {
    getAttributeList(categoryIds.value)
    setTimeout(() => {
      dialogLoading.value = false
      visible.value = false
    }, 300)
  }
}
async function deleteAttribute(id: number) {
  confirmDialogService.show().onConfirm(async () => {
    try {
      await deleteAttributeApi(id)
      toast({
        severity: 'success',
        summary: 'Success',
        message: 'Operation completed successfully',
      })
      getAttributeList(categoryIds.value)
    } catch (error) {
    } finally {
      confirmDialogService.confirmDone()
    }
  })
}

onMounted(async () => {
  // categoryIds.value = '4/22/178'
  // getAttributeList('4/22/178')
})
</script>
