<template>
  <!-- 二级导航 -->
  <div class="children-container pt-1 border-l-2 ml-6 dark:border-surface-800" v-show="item.children && item.expanded">
    <div
      class="item-child relative pl-3 pr-5 cursor-pointer"
      v-for="child in item.children"
      :key="child.path"
      @click.stop="toggleExpanded(child)"
    >
      <div
        class="label px-4 leading-10 rounded-md text-surface-600 dark:text-surface-400 dark:hover:text-primary-100 transition-all duration-200"
        :class="{
          'bg-surface-100 dark:bg-surface-800': route.path === child.path,
          'flex justify-between items-center': !!child.children,
        }"
      >
        <div class="flex items-center">
          <!-- 导航图标 -->
          <NavIcon :item="child" :showIcon="props.showIcon" />
          <!-- 导航标题 -->
          <span class="truncate" :title="child.label">{{ child.label }}</span>
        </div>
        <!-- 包含三级导航时显示（展开箭头图标） -->
        <ExpandIcon v-if="child.children" :item="child" />
      </div>

      <!-- 三级导航 -->
      <Tertiary :child="child" :route="route" :toggleExpanded="toggleExpanded" />
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
const props = defineProps<{
  item: RouteItem
  showIcon: boolean
  toggleExpanded: (item: RouteItem) => void
  route: RouteLocationNormalizedLoadedGeneric
}>()
</script>
