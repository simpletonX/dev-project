<template>
  <!-- 三级导航 -->
  <div
    class="last-child-container pt-1 border-l-2 dark:border-surface-800 ml-3 mt-1 pl-2"
    v-show="child.children && child.expanded"
  >
    <div
      class="last-child-item px-3 lh-[32px] py-1 text-primary-500 dark:text-primary-500 rounded-md"
      v-for="lastChild in child.children"
      :class="{
        'bg-primary-100 dark:bg-primary-800 text-primary-950 dark:text-surface-100': route.path === lastChild.path,
      }"
      :key="lastChild.path"
      @click.stop="toggleExpanded(lastChild)"
    >
      <!-- 导航标题 -->
      {{ lastChild.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

interface RouteItem {
  path: string
  label: string
  meta: {
    icon: Array<string>
  }
  expanded?: boolean
  children?: RouteItem[]
}
defineProps<{
  child: RouteItem
  toggleExpanded: (item: RouteItem) => void
  route: RouteLocationNormalizedLoadedGeneric
}>()
</script>
