<template>
  <div class="logo-container flex items-center">
    <font-awesome-icon :icon="['fas', 'compass']" :size="size" />
    <span v-if="showTitle" class="ml-2 font-bold text-lg">Выбор компаса</span>
  </div>
</template>

<script setup lang="ts">
const { showTitle = false } = defineProps<{
  showTitle: boolean
  size: string
}>()
</script>
