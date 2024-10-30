<template>
  <font-awesome-icon
    :icon="['fas', 'angle-down']"
    size="lg"
    class="ml-3 text-surface-400 transition-all duration-200 text-[1rem]"
    :class="{
      'rotate-180': item.expanded,
    }"
  />
</template>

<script setup lang="ts">
interface RouteItem {
  expanded?: boolean
}
defineProps<{
  item: RouteItem
}>()
</script>
