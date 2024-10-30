<template>
  <font-awesome-icon
    v-if="item?.meta.icon && props.showIcon"
    :icon="item.meta.icon"
    size="lg"
    class="mr-3 text-[1.15rem]"
  />
</template>

<script setup lang="ts">
interface RouteItem {
  path: string
  label: string
  meta: {
    icon: Array<string>
  }
  expanded?: boolean
  children?: RouteItem[]
}
const props = defineProps<{
  item?: RouteItem
  showIcon: boolean
}>()
</script>
