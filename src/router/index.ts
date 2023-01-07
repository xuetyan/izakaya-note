import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/getData.vue'
import Home from '@/views/Menu.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
