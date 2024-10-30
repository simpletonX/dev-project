<template>
  <div id="vue-app">
    <Toast />
    <MyConfirmDialog
      :loading="confirmDialogService.confirmLoading.value"
      v-model:visible="confirmDialogService.visible.value"
      :title="confirmDialogService.title.value"
      :content="confirmDialogService.content.value"
      :width="confirmDialogService.width.value"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    ></MyConfirmDialog>

    <router-view />
    <MyProgress />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/utils/theme'
useTheme()

import { confirmDialogService } from '@/services/confirmDialogService'
const handleConfirm = () => {
  confirmDialogService.confirm()
}
const handleCancel = () => {
  confirmDialogService.cancel()
}
</script>
