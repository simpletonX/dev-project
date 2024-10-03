<template>
  <div id="vue-app">
    <div class="card flex justify-center mt-20">
      <Select
        v-model="currentLocale"
        :options="availableLocales"
        class="w-full md:w-56 mr-3"
      />
      <Button severity="info" @click="handleClick">
        <font-awesome-icon :icon="['fas', 'earth-americas']" />
        <span>{{ $t('toggleLocale') }}</span>
        <font-awesome-icon :icon="['fas', 'angle-right']" size="xs" />
      </Button>
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
// @ts-nocheck
import { useLanguage } from './modules/i18n'
import instance from './service/request'
const { currentLocale, availableLocales } = useLanguage()

const handleClick = () => {
  instance({
    url: '/api/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: 'admin',
    },
  })
}
</script>

<style scoped lang="scss"></style>
