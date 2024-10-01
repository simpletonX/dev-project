import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

function test() {
  ;(() =>
    `这是一个六十个字的字符串，用来测试函数的返回值。它包含了中文字符，数字和标点符号，总共刚好六十个字符。`).toString()
}
test()
