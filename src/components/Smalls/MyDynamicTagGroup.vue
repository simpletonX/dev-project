<template>
  <MyPopoverMenu :options="popoverOptions" @command="popoverCommand">
    <template #default="{ togglePopover }">
      <Button
        v-for="(item, index) in group"
        :key="index"
        outlined
        size="small"
        class="mr-2 mb-2"
        :class="{
          '!border-primary-500 shadow-xl shadow-xl': focusIndex === index,
        }"
        @click="focusIndex !== index && markPopoverTarget($event, item, togglePopover)"
      >
        <input
          ref="inputRef"
          v-if="focusIndex === index"
          type="text"
          :value="item[labelKey]"
          @blur="updateLabel($event, index, group)"
          @keydown.enter="updateLabel($event, index, group)"
          class="w-[80px] text-center bg-transparent !border-none !shadow-none !outline-none !focus:bg-red-500"
        />
        <template v-else>{{ item[labelKey] }}</template>
      </Button>
      <Button outlined size="small" class="mb-2" icon="pi pi-plus" @click="insertItem"></Button>
    </template>
  </MyPopoverMenu>
</template>

<script setup lang="ts">
import type { PopoverOption } from '@/components/types/smalls'

const props = defineProps<{
  popoverOptions: PopoverOption[]
  group: any[]
  labelKey: string
  focusIndex: number
}>()
const emits = defineEmits<{
  (e: 'update:group', group: any[]): void
  (e: 'update:focusIndex', index: number): void
  (e: 'command', label?: string, value?: string | number): void
  (e: 'focus', item: any): void
  (e: 'insert'): void
}>()

const inputRef = ref()
watch(
  () => props.focusIndex,
  (newVal) => {
    if (newVal !== -1) {
      nextTick(() => {
        inputRef.value[0].focus()
        inputRef.value[0].select()
      })
    }
  }
)

function popoverCommand(label?: string, value?: string | number) {
  emits('command', label, value)
}
function markPopoverTarget(event: Event, item: any, togglePopover: (event: Event) => void) {
  togglePopover(event)
  emits('focus', item)
}
function updateLabel(event: Event, index: number, group: any[]) {
  emits('update:focusIndex', -1)
  const copyGroup = JSON.parse(JSON.stringify(group))
  const target = event.target as HTMLInputElement

  if (!target.value) {
    return (target.value = copyGroup[index][props.labelKey])
  }
  copyGroup[index][props.labelKey] = target.value
  emits('update:group', copyGroup)
}
function insertItem() {
  emits('insert')
}
</script>
