<template>
  <div class="layout-frame flex justify-between items-center min-w-[1100px]" ref="layoutFrame">
    <div class="aside-bar h-full border-r border-surface-200 dark:border-surface-800 dark:bg-surface-950 relative">
      <div class="aside-content" v-show="preferences.asideBarExpanded">
        <div class="logo-area w-[calc(100%-30px)] h-[60px] ml-[15px] pl-2 pt-6 flex justify-between items-center">
          <Logo showTitle size="xl" />
          <Button size="small" icon="pi pi-angle-left" severity="secondary" @click="toggleExpand" />
        </div>
        <AsideNavbar :routes="routes" :showIcon="false" class="h-[calc(100%-60px)]" />
      </div>

      <div
        class="expand absolute w-full h-full flex justify-center items-start left-0 top-0"
        v-show="!preferences.asideBarExpanded"
      >
        <Button class="mt-10" icon="pi pi-angle-right" severity="secondary" @click="toggleExpand" />
      </div>
    </div>

    <div class="main-content">
      <div class="main-header dark:bg-surface-950">
        <BreadcrumbTopbar />
      </div>
      <div class="main-container p-6 bg-surface-50 dark:bg-surface-950 overflow-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/stores/modules/routes'
const { menuRoutes } = useRouteStore()
const routes = ref(menuRoutes)

import { usePreferenceStore } from '@/stores/modules/preferences'
const preferenceStore = usePreferenceStore()
const { preferences } = storeToRefs(preferenceStore)
const { setPreferences } = preferenceStore

const layoutFrame = ref()
function setAsideWidth() {
  layoutFrame.value.style.setProperty('--aside-width', preferences.value.asideBarExpanded ? '296px' : '70px')
}
function toggleExpand() {
  setPreferences('asideBarExpanded', !preferences.value.asideBarExpanded)
  setAsideWidth()
}

onMounted(() => {
  setAsideWidth()
})
</script>

<style scoped lang="scss">
@keyframes expandToRight {
  0% {
    transform: translateX(-10px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.layout-frame {
  --aside-width: 296px;
  height: calc(100vh - 17px);

  .aside-bar {
    width: var(--aside-width);

    .expand {
      transform: translateX(0);
      animation: expandToRight 0.4s;
      animation-fill-mode: backwards;
      animation-delay: 0.1s;
    }
  }

  .main-content {
    width: calc(100% - var(--aside-width));
    height: 100%;

    .main-header {
      height: 70px;
    }

    .main-container {
      height: calc(100% - 70px);
    }
  }
}
.fade-enter-from {
  transform: translate(0, 20px);
}
.fade-enter-active {
  transition: all 0.2s;
}
.fade-enter-to {
  transform: translate(0, 0);
}
</style>
