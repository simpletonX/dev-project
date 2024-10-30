import { createApp, DirectiveBinding, ObjectDirective } from 'vue'
import MyLoading from '../components/MyLoading.vue'

export const loadingDirective: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const app = createApp(MyLoading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      append(el)
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value == binding.oldValue) return
    if (binding.value) {
      append(el)
    } else {
      remove(el)
    }
  },
  unmounted(el: HTMLElement) {
    remove(el)
  },
}

function append(el: HTMLElement) {
  el.appendChild(el.instance.$el)
}

function remove(el: HTMLElement) {
  // 检查 el.instance.$el 是否为 el 的子节点
  if (el.contains(el.instance.$el)) {
    el.removeChild(el.instance.$el)
  }
}

declare global {
  interface HTMLElement {
    instance?: any
  }
}
