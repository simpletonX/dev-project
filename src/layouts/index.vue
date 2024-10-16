<template>
  <div class="layout-frame flex justify-between items-center">
    <div class="aside-bar h-full border-r border-surface-300 dark:border-surface-800">
      <div
        class="logo-area w-[calc(100%-30px)] h-[70px] ml-[15px] px-2 pt-6 border-b border-surface-200 dark:border-surface-800"
      >
        <Logo showTitle size="xl" />
      </div>
      <AsideNavbar :routes="routes" class="h-[calc(100%-70px)]" />
    </div>
    <div class="main-content">
      <div class="main-header">
        <BreadcrumbTopbar />
      </div>
      <div class="main-container">
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
</script>

<style scoped lang="scss">
$aside-width: 320px;

.layout-frame {
  height: 100vh;

  .aside-bar {
    width: $aside-width;
    height: 100%;
  }

  .main-content {
    width: calc(100% - $aside-width);
    height: 100%;

    .main-header {
      height: 70px;
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
