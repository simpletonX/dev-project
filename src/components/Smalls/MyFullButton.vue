<template>
  <Button type="submit" class="w-full">
    <font-awesome-icon :icon="['fas', 'code-branch']" />
    <span>{{ label }}</span>
  </Button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string[]
    label: string
  }>(),
  {
    icon: () => ['fas', 'code-branch'],
    label: 'Confirm submission',
  }
)
</script>
