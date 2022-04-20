const routes = [
  {
    path: '/',
    redirect: '/main/home',
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', redirect: '/main/home'},
      {
        name: 'home',
        path: 'home',
        components: {
          default: () => import('pages/main/HomePage'),
          drawer: () => import('layouts/drawers/MainDrawer'),
          header: () => import('layouts/headers/MainHeader'),
        }
      },
      {
        path: 'profile',
        components: {
          default: () => import('pages/main/ProfilePage'),
          drawer: () => import('layouts/drawers/MainDrawer'),
          header: () => import('layouts/headers/MainHeader'),
        }
      },
    ]
  },
  {
    path: '/stack',
    component: () => import('layouts/StackLayout'),
    children: [
      {path: 'login', component: () => import('pages/stack/LoginPage')},
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
