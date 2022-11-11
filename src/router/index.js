import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      layout: 'layout-auth'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFindPage.vue')
  },
  {
    // вся часть после слеша расценивается как параметр pathMatch, 
    // который может иметь произвольное количество символов и произвольное количество сегментов. 
    // То есть по сути он будет представлять запрос, которому не соответствуют другие маршруты.
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

export default router
