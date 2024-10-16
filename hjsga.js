;[
  {
    path: '/',
    component: () => import('@/pages'),
    children: [
      {
        path: '/product',
        component: () => import('@/pages/product'),
        children: [
          {
            path: '/product/:id',
            component: () => import('@/pages/product/detail.vue'),
          },
        ],
      },
      {
        path: '/todo',
        component: () => import('@/pages/todo'),
        children: [
          {
            path: '/todo/:id',
            component: () => import('@/pages/todo/detail.vue'),
          },
        ],
      },
    ],
  },
]
