<template>
  <div id="vue-app">
    <Toast />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/modules/theme'
useTheme()
</script>
