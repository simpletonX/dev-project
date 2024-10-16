export default [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    name: 'layout',
    meta: {
      contain: false,
    },
    children: [
      {
        path: '/home',
        component: () => import('@/layouts/home/index.vue'),
        name: 'home',
        meta: {
          contain: true,
          preset: 'home',
          icon: ['fas', 'house-user'],
        },
      },
      {
        path: '/product',
        name: 'product',
        meta: {
          contain: true,
          preset: 'product.$label$',
          icon: ['fab', 'square-web-awesome'],
        },
        redirect: '/product/stock-keeping',
        children: [
          {
            path: '/product/stock-keeping',
            component: () => import('@/layouts/product/stock-keeping/index.vue'),
            name: 'stock-keeping',
            meta: {
              contain: true,
              preset: 'product.stock-keeping',
              icon: ['fas', 'square-h'],
            },
          },
          {
            path: '/product/standard-product',
            component: () => import('@/layouts/product/standard-product/index.vue'),
            name: 'standard-product',
            meta: {
              contain: true,
              preset: 'product.standard-product',
              icon: ['fas', 'square-parking'],
            },
          },
          {
            path: '/product/attribute',
            component: () => import('@/layouts/product/attribute/index.vue'),
            name: 'attribute',
            meta: {
              contain: true,
              preset: 'product.attribute',
              icon: ['fas', 'gear'],
            },
          },
          {
            path: '/product/brand',
            component: () => import('@/layouts/product/brand/index.vue'),
            name: 'brand',
            meta: {
              contain: true,
              preset: 'product.brand',
              icon: ['fab', 'amazon'],
            },
          },
        ],
      },
      {
        path: '/acl',
        name: 'acl',
        meta: {
          contain: true,
          preset: 'acl.$label$',
          icon: ['fas', 'key'],
        },
        redirect: '/acl/permission',
        children: [
          {
            path: '/acl/permission',
            component: () => import('@/layouts/acl/permission/index.vue'),
            name: 'permission',
            meta: {
              contain: true,
              preset: 'acl.permission',
              icon: ['fas', 'screwdriver-wrench'],
            },
          },
          {
            path: '/acl/role',
            component: () => import('@/layouts/acl/role/index.vue'),
            name: 'role',
            meta: {
              contain: true,
              preset: 'acl.role',
              icon: ['fas', 'hat-cowboy'],
            },
          },
          {
            path: '/acl/user',
            component: () => import('@/layouts/acl/user/index.vue'),
            name: 'user',
            meta: {
              contain: true,
              preset: 'acl.user',
              icon: ['fas', 'user-large'],
            },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    name: 'login',
    meta: {
      contain: false,
    },
  },
  {
    path: '/visualization',
    component: () => import('@/pages/visualization.vue'),
    name: 'visualization',
    meta: {
      contain: false,
    },
  },
]
