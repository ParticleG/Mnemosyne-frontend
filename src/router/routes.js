const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', redirect: '/home'},
      {
        name: 'home',
        path: 'home',
        components: {
          default: () => import('pages/HomePage'),
          header: () => import('layouts/headers/MainHeader'),
        }
      },
      {
        name: 'login',
        path: 'login',
        components: {
          default: () => import('pages/LoginPage'),
          header: () => import('layouts/headers/MainHeader'),
        }
      },
      {
        name: 'profile',
        path: 'profile',
        components: {
          default: () => import('pages/ProfilePage'),
          header: () => import('layouts/headers/MainHeader'),
        }
      },
      {
        name: 'search',
        path: 'search',
        components: {
          default: () => import('pages/SearchPage'),
          header: () => import('layouts/headers/SearchHeader'),
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
