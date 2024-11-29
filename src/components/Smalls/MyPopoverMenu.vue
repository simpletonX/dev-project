<!-- 
  弹出式水平可选项菜单组件（基于Popover）
  - props:
    - options: 选项集合
      - fontAwesomeFont?: font-awesome-font组件所对应的图标描述
      - fontAwesomeFontClass?: 应用于<font-awesome-font>组件中的透传class
      - label: 标签，选项的标题描述
      - value?: 选项的唯一标识符（当label名称重复，可以以此作为区分）
      - labelClass?: 应用于标签的透传class

  - emits: 
    - [command] 当选项被点击时传出的emit：
      - command提供两个可选参数 [label: string] [value: string | number]
      - [label: string]也就是选项的标题描述
      - [value: string | number]选项的唯一标识符

  在父组件中的调用示例：
    - 通过默认插槽解构方法[togglePopover]，这是提供给外部用于控制Popover显示/隐藏的事件方法
    - [togglePopover]方法需要接收一个事件对象参数，用于访问触发该事件的DOM对象
    <MyPopoverMenu :options="..." @command="popoverCommand">
      <template #default="{ togglePopover }">
        <Button @click="togglePopover(event)">...</Button>
      </template>
    </MyPopoverMenu>
-->
<template>
  <div class="popover-menu">
    <Popover ref="op" :pt="{ content: { class: '!p-1' } }">
      <div class="flex items-center">
        <div
          class="popover-option"
          v-for="(option, index) in options"
          :key="option.label"
          @click="onCommand(option.label, option?.value)"
        >
          <Button text size="small" class="!px-2">
            <font-awesome-icon
              v-if="option.fontAwesomeFont"
              :icon="option.fontAwesomeFont"
              :class="option.fontAwesomeFontClass"
            />
            <span :class="option.labelClass">{{ option.label }}</span>
          </Button>
          <template v-if="index !== options.length - 1">
            <span class="text-surface-300 dark:text-surface-700">|</span>
          </template>
        </div>
      </div>
    </Popover>

    <slot :togglePopover="togglePopover"></slot>
  </div>
</template>

<script setup lang="ts">
import type { PopoverOption } from '@/components/types/smalls'

const op = ref()
defineProps<{
  options: PopoverOption[]
}>()

const emits = defineEmits<{
  (e: 'command', label?: string, value?: string | number): void
}>()
const togglePopover = (event: Event) => {
  op.value.toggle(event)
}
const onCommand = (label: string, value?: string | number) => {
  emits('command', label, value)
  op.value.hide()
}
</script>
