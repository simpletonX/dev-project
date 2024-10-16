<template>
  <div class="aside-container h-full bg-surface-0 dark:bg-surface-900 overflow-auto">
    <div class="menu-item select-none" v-for="item in routes" :key="item.path">
      <div
        class="item-title m-2 flex items-center justify-between hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer px-5 py-[0.65rem] transition-all duration-300 rounded-md"
        :class="{
          'bg-surface-100 dark:bg-surface-800': !item.children && route.path === item.path,
        }"
        @click="toggleExpanded(item)"
      >
        <div class="flex items-center">
          <font-awesome-icon
            v-if="item.meta.icon && props.showIcon"
            :icon="item.meta.icon"
            size="lg"
            class="mr-3 text-[1.15rem]"
          />
          <div class="label">{{ item.label }}</div>
        </div>
        <template v-if="item.children">
          <font-awesome-icon
            :icon="['fas', 'angle-down']"
            class="text-surface-500 transition-all duration-200"
            :class="{
              'rotate-180': item.expanded,
            }"
          />
        </template>
      </div>

      <div
        class="children-container pt-1 border-l-2 ml-6 dark:border-surface-800"
        v-show="item.children && item.expanded"
      >
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
              <font-awesome-icon
                v-if="child.meta.icon && props.showIcon"
                :icon="child.meta.icon"
                class="mr-3 text-[1rem]"
              />
              <span class="truncate" :title="child.label">{{ child.label }}</span>
            </div>
            <template v-if="child.children">
              <font-awesome-icon
                :icon="['fas', 'angle-down']"
                class="text-surface-500 transition-all duration-200"
                :class="{
                  'rotate-180': child.expanded,
                }"
              />
            </template>
          </div>

          <div
            class="last-child-container pt-1 border-l-2 dark:border-surface-800 ml-3 mt-1 pl-2"
            v-show="child.children && child.expanded"
          >
            <div
              class="last-child-item px-3 lh-[32px] py-1 text-primary-500 dark:text-primary-500 rounded-md"
              v-for="lastChild in child.children"
              :class="{
                'bg-primary-100 dark:bg-primary-800 text-primary-950 dark:text-surface-100':
                  route.path === lastChild.path,
              }"
              :key="lastChild.path"
              @click.stop="toggleExpanded(lastChild)"
            >
              {{ lastChild.label }}
            </div>
          </div>
        </div>
      </div>
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
  console.log({ ...item })
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
