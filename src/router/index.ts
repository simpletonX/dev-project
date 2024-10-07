// import modules from './modules'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

/**
 * unplugin-vue-router 默认会为 src/pages 中的文件自动创建路由
 * 推荐页面目录结构如下所示（示例）：
 * src/pages/                生成路由所示
 *  /users
 *    |- [id].vue            /users/1（与 vue-router 中的 /:id 效果相同）
 *    |- index.vue           /users
 *    |- ...
 *  /[...404].vue            /...（匹配所有未定义的路由，重定向到[...404].vue）
 *  /login.vue               /login
 *  /index.vue               /
 *  /...
 */
const router = createRouter({
  history: createWebHashHistory(),
  // routes: modules,
  routes, // unplugin-vue-router 动态路由-自动生成路由
})

export default router
