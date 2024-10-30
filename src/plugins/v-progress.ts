import { createApp, DirectiveBinding, ObjectDirective } from 'vue'
import MyProgress from '../components/MyProgress.vue'

export const progressDirective: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const app = createApp(MyProgress)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      append(el)
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value === binding.oldValue) return
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
  el.instance.$el.classList.add('show')
}

function remove(el: HTMLElement) {
  if (el.contains(el.instance.$el)) {
    el.instance.$el.classList.remove('show')
    setTimeout(() => {
      el.removeChild(el.instance.$el)
    }, 300) // 等待动画结束
  }
}

declare global {
  interface HTMLElement {
    instance?: any
  }
}
