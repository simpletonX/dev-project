<template>
  <div class="aside-container bg-surface-0 dark:bg-surface-950 overflow-auto">
    <!-- 一级导航 -->
    <div class="menu-item select-none" v-for="item in routes" :key="item.path">
      <div
        class="item-title m-2 flex items-center justify-between hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer px-5 py-[0.65rem] transition-all duration-300 rounded-md"
        :class="{
          'bg-surface-100 dark:bg-surface-800': !item.children && route.path === item.path,
        }"
        @click="toggleExpanded(item)"
      >
        <div class="flex items-center">
          <!-- 导航图标 -->
          <NavIcon :item="item" :showIcon="props.showIcon" />
          <!-- 导航标题 -->
          <div class="label w-[234px] truncate">{{ item.label }}</div>
        </div>
        <!-- 包含二级导航时显示（展开箭头图标） -->
        <ExpandIcon v-if="item.children" :item="item" />
      </div>

      <!-- 二级导航（组件内部自行处理是否渲染） -->
      <SecondaryNav
        :item="item"
        :showIcon="props.showIcon"
        :toggleExpanded="toggleExpanded"
        :route="route"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

interface RouteItem {
  path: string
  label: string
  meta: {
    icon: Array<string>
  }
  expanded?: boolean
  children?: RouteItem[]
}
interface Props {
  routes: Array<RouteItem>
  showIcon: boolean
}
const props = defineProps<Props>()
const routes = ref(
  props.routes.map((el) => {
    return {
      ...el,
      expanded: false,
    }
  })
)

function toggleExpanded(item: any) {
  if (item.children) {
    item.expanded = !item.expanded
  } else {
    router.push(item.path)
  }
}

watch(
  () => route.path,
  (newPath: string) => {
    routes.value.forEach((route: any) => {
      if (route.children) {
        route.children.forEach((child: any) => {
          if (child.children) {
            const hasMatchingGrandchild = child.children.some(
              (grandchild: any) => grandchild.path === newPath
            )
            if (hasMatchingGrandchild) {
              route.expanded = true
              child.expanded = true
            }
          } else {
            if (child.path === newPath) {
              route.expanded = true
            }
          }
        })
      }
    })
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.aside-container {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
