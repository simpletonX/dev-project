<template>
  <MyDialog
    :visible="!visible"
    title="Standard Product Unit Details"
    width="620px"
    content-class="mt-3"
    :loading="loading"
    @close="emits('update:visible', false)"
  >
    <form>
      <div class="flex justify-between">
        <MyInputItem label="SPU Name" v-model="formFields.spuName" placeholder="Please enter the SPU name." class="w-[59%]" />
        <MyInputItem label="Select Brand" class="w-[38.5%]">
          <Select
            v-model="formFields.tmId"
            :options="brandList"
            optionValue="id"
            optionLabel="tmName"
            placeholder="Select Brand"
            class="w-full"
          />
        </MyInputItem>
      </div>
      <MyInputItem label="Description">
        <Textarea class="w-full" v-model="formFields.description" placeholder="Please enter the description." />
      </MyInputItem>
      <MyInputItem label="Upload Images">
        <MyUploadList />
      </MyInputItem>
      <MyInputItem label="Sales attribute">
        <div class="flex justify-between">
          <Select
            v-model="formFields.tmId"
            :options="anyList"
            optionValue="id"
            optionLabel="name"
            placeholder="Select Sales attribute"
            class="w-[65%]"
          />
          <Button class="w-[33%]" icon="pi pi-plus" label="Add Sales attribute" />
        </div>
      </MyInputItem>
      <MyDataTable :data="formFields.saleAttrList" :refreshButton="false">
        <Column header="No.">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column field="attrName" header="Attribute name" />
        <Column field="attrValueList" header="Attribute values" class="max-w-[240px]">
          <template #body="{ data }">
            <div class="truncate">
              <Tag v-for="item in data.attrValueList" :key="item" class="mr-2">{{ item }}</Tag>
            </div>
          </template>
        </Column>
        <Column header="Operation">
          <template #body="{ data }">
            <Button icon="pi pi-trash" outlined severity="danger" size="small" @click="deleteSaleAttr(data)" label="Delete" />
          </template>
        </Column>
      </MyDataTable>
      <div class="flex justify-between mt-8">
        <Button text label="Rewrite input" icon="pi pi-refresh" severity="warn" />
        <div class="flex">
          <Button text label="Cancel" class="mr-3" />
          <Button icon="pi pi-send" label="Submit Table" />
        </div>
      </div>
    </form>
  </MyDialog>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:visible'])
defineProps<{
  visible: boolean
  loading?: boolean
}>()

const formFields = reactive({
  spuName: '',
  tmId: '',
  description: '',
  saleAttrList: [
    {
      attrName: 'react-webapp',
      attrValueList: ['development', 'production', 'testing', 'deployment'],
    },
  ],
})
const brandList = ref([
  {
    id: '1',
    tmName: 'Brand 1',
  },
])
const anyList = ref([
  {
    id: '1',
    name: 'Color',
  },
])
const deleteSaleAttr = (data: any) => {
  console.log(data)
}
</script>
