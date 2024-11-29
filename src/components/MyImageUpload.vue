<template>
  <div class="my-file-upload">
    <div class="flex justify-center mb-3">{{ title || 'Upload Image' }}</div>
    <div class="flex justify-center items-center mb-2">
      <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
      <span class="ml-3">Please upload the following file types:</span>
    </div>
    <div class="flex justify-center items-center mb-5">
      <Tag v-for="(item, index) in accept" :key="index" class="mx-1" severity="info">
        {{ item }}
      </Tag>
    </div>
    <div class="flex justify-center items-center">
      <FileUpload
        v-show="!progress"
        auto
        name="file"
        mode="basic"
        severity="secondary"
        class="p-button-outlined"
        invalidFileTypeMessage="File type error"
        :invalidFileSizeMessage="`Please upload a file less than ${size}Mb`"
        :url="baseUrl + '/admin/product/fileUpload'"
        :accept="acceptString"
        :maxFileSize="maxFileSize"
        @select="onFileSelect"
        @before-send="onBeforeSend"
        @upload="onUpload"
        @error="onError"
      />
      <ProgressBar v-show="progress" mode="indeterminate" class="w-1/2 mt-5" style="height: 5px"></ProgressBar>
    </div>
    <div class="flex justify-center">
      <Image v-if="src_ && !progress" class="mt-4 dialog-show" preview>
        <template #image>
          <img :src="src_" alt="image" class="shadow-md rounded-xl w-[220px] h-[130px] object-cover" />
        </template>
        <template #preview="slotProps">
          <img :src="src_" alt="preview" :style="slotProps.style" />
        </template>
      </Image>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  FileUploadBeforeSendEvent,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  FileUploadErrorEvent,
} from 'primevue/fileupload'
import type { ResponseData } from '@/api/types'
import toast from '@/utils/primevue-service/toast'

const emits = defineEmits(['exportUrl', 'update:src'])
const props = defineProps<{
  title: string
  accept: string[]
  size: number // 单位：Mb
  src: string // v-model-src
  initSrc: string
}>()

const baseUrl = import.meta.env.VITE_API_BASE_URL
const src_ = ref<string | null>(props.initSrc || null)
const progress = ref(false)
const acceptString = computed(() => props.accept.join(', ')) // 将accept数组转换为字符串
const maxFileSize = computed(() => props.size * 1024 * 1024) // mb转bytes

function onFileSelect(event: FileUploadSelectEvent) {
  if (!event.files[0]) return

  const file = event.files[0]
  const reader = new FileReader()

  reader.onload = async (e) => {
    src_.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function onBeforeSend(event: FileUploadBeforeSendEvent) {
  event.xhr.setRequestHeader('token', localStorage.getItem('token') as string)
  progress.value = true
}
function onUpload(event: FileUploadUploadEvent) {
  const response: ResponseData = JSON.parse(event.xhr.response)
  if (response.code !== 200) {
    toast({
      severity: 'error',
      summary: 'Ошибка сервера',
      message: response.message,
    })
    src_.value = null
    progress.value = false
    return
  }

  emits('update:src', response.data)
  emits('exportUrl', response.data)

  if (event.xhr.status === 200) {
    setTimeout(() => {
      progress.value = false
    }, 600)
  }
}
function onError(event: FileUploadErrorEvent) {
  // testing
  emits(
    'update:src',
    'https://images.unsplash.com/photo-1729761150068-1174d058dc6c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  )

  src_.value =
    'https://images.unsplash.com/photo-1729761150068-1174d058dc6c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  setTimeout(() => {
    progress.value = false
  }, 500)
  toast({
    severity: 'error',
    summary: 'Ошибка сервера',
    message: event.xhr.response.message,
  })
}
</script>
