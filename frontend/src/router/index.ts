import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/LandingPage.vue'
import Aspiration from '@/components/Aspiration.vue'
import Dashboard from '@/components/Dashboard.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import ChatPage from '@/components/ChatPage.vue';
import CalendarView from '@/components/CalendarView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      component: LandingPage,
      meta: { requiresAuth: false }
    },
    { 
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    { 
      path: '/aspirations', 
      component: Aspiration,
      meta: { requiresAuth: false }
    },
    { path: '/chatlist',
      component: CalendarView,
      meta: { requiresAuth: true }
    },
    { path: '/chat/:chatId',
      component: ChatPage,
      meta: { requiresAuth: true }
    },
  ]
})

// Auth guard
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth0()
  
  if (to.path === '/' && isAuthenticated.value) {
    next('/dashboard')
  } else if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/')
  } else {
    next()
  }
})

export default router