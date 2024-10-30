<template>
  <div
    class="my-dialog-mask w-full h-full bg-black/55 fixed top-0 left-0 z-50 flex justify-center items-center"
    v-if="visible"
  >
    <div
      class="my-dialog-content relative bg-white dark:bg-surface-800 rounded-[5px] p-6 pt-4 min-w-[320px] max-w-[90vw] max-h-[94vh] shadow-md"
      :style="{ width }"
      v-progress="$attrs['loading']"
    >
      <div class="header flex justify-between items-center h-[2rem]">
        <slot name="header">
          <span class="text-[1.05rem]">{{ title }}</span>
        </slot>
        <Button icon="pi pi-times" text rounded @click="close" />
      </div>
      <div class="content max-h-[calc(94vh-5rem)] overflow-auto">
        <div class="desc mt-2 text-surface-500 mb-8">{{ content }}</div>

        <div class="flex justify-end">
          <Button class="mr-2" label="Cancel" outlined @click="emit('cancel')"></Button>
          <Button label="Continue" @click="emit('confirm')"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  content: string
  visible: boolean
  width?: string
}>()

const emit = defineEmits(['close', 'update:visible', 'confirm', 'cancel'])
const close = () => {
  emit('close')
  emit('update:visible', false)
}
</script>

<style scoped>
.my-dialog-mask .my-dialog-content {
  animation: dialog-show 0.2s ease-in-out;
}
</style>
