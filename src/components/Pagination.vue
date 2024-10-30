<template>
  <!-- 通用分页器组件 -->
  <Paginator
    v-model:first="localFirst"
    :rows="localRows"
    :totalRecords="totalRecords"
    :rowsPerPageOptions="[5, 10, 15, 20]"
    @page="onPageChange"
  ></Paginator>
</template>

<script setup lang="ts">
const props = defineProps<{
  first: number
  rows: number
  totalRecords: number
}>()

const emit = defineEmits<{
  (e: 'update:first', value: number): void
  (e: 'update:rows', value: number): void
  (e: 'pageChange', event: any): void
}>()

const localFirst = ref(props.first)
const localRows = ref(props.rows)

watch(
  () => props.first,
  (newValue) => {
    localFirst.value = newValue
  }
)

watch(
  () => props.rows,
  (newValue) => {
    localRows.value = newValue
  }
)

function onPageChange(event: any) {
  emit('update:first', event.first)
  emit('update:rows', event.rows)
  emit('pageChange', event)
}
</script>
