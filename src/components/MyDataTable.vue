<template>
  <DataTable :value="data" class="mb-5" rowHover v-progress="loading">
    <template #empty>
      <div class="null-placeholder my-5">
        <div class="flex justify-center items-center">
          <font-awesome-icon :icon="['fas', 'box-open']" class="text-2xl mr-3" />
          <div class="text-center text-gray-500 mr-3">No data available at the moment.</div>
          <Button v-if="refreshButton" outlined label="Refresh request" @click="emits('refresh')" />
        </div>
      </div>
    </template>
    <slot />
  </DataTable>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    data: any[]
    loading?: boolean
    refreshButton?: boolean
  }>(),
  {
    refreshButton: true,
  }
)
const emits = defineEmits<{
  (e: 'refresh', ...args: any[]): void
}>()
</script>
