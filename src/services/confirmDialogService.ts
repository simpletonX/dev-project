import { ref } from 'vue'

export const confirmDialogService = {
  visible: ref(false),
  title: ref(''),
  width: ref(''),
  content: ref(''),
  confirmLoading: ref(false),
  confirmCallback: null as (() => void) | null,

  show(options?: { title?: string; content?: string; width?: string }) {
    this.visible.value = true
    this.title.value = options?.title || 'Warning'
    this.content.value = options?.content || 'This will delete the content forever, are you sure you want to continue?'
    this.width.value = options?.width || '30rem'

    return this
  },

  onConfirm(callback: () => void) {
    this.confirmCallback = callback

    return this
  },

  confirm() {
    if (this.confirmCallback) {
      this.confirmLoading.value = true
      this.confirmCallback()
      this.confirmCallback = null
    }
  },

  cancel() {
    this.visible.value = false
    this.confirmCallback = null
  },

  confirmDone() {
    setTimeout(() => {
      this.confirmLoading.value = false
      this.visible.value = false
    }, 400)
  },
}
