<template>
  <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload" :multiple="true" accept="image/*" :maxFileSize="1000000">
    <template #empty>
      <span>Drag and drop files to here to upload.</span>
    </template>
  </FileUpload>
</template>

<script setup lang="ts">
import toast from '@/utils/primevue-service/toast'

const onAdvancedUpload = () => {
  toast({ severity: 'info', summary: 'Success', detail: 'File Uploaded' })
}
</script>
