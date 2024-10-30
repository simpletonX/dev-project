<template>
  <div class="layout-frame flex justify-between items-center">
    <div
      class="aside-bar h-full border-r border-surface-200 dark:border-surface-800 dark:bg-surface-950"
    >
      <div class="logo-area w-[calc(100%-30px)] h-[60px] ml-[15px] px-2 pt-6">
        <Logo showTitle size="xl" />
      </div>
      <AsideNavbar :routes="routes" :showIcon="false" class="h-[calc(100%-60px)]" />
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
</script>

<style scoped lang="scss">
$aside-width: 296px;

.layout-frame {
  height: 100vh;

  .aside-bar {
    width: $aside-width;
  }

  .main-content {
    width: calc(100% - $aside-width);
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
