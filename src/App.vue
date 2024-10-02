<template>
  <div id="vue-app">
    <div class="card flex justify-center mt-20">
      <Select
        v-model="currentLocale"
        :options="availableLocales"
        class="w-full md:w-56 mr-3"
      />
      <Button severity="info">
        <!-- <font-awesome-icon :icon="['fas', 'font-awesome']" size="lg" /> -->
        <font-awesome-icon :icon="['fas', 'earth-americas']" />
        <span>{{ $t('toggleLocale') }}</span>
        <font-awesome-icon :icon="['fas', 'angle-right']" size="xs" />
      </Button>

    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
// @ts-nocheck
import { useLanguage } from './plugins/i18n'
const { currentLocale, availableLocales } = useLanguage()
</script>

<style scoped></style>
