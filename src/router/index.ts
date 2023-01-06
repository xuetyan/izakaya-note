import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/index.vue'
import Home from '@/views/Menu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'getData',
      redirect: '/home',
      component: HomeView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        }
      ]
    },
  ]
})

export default router
