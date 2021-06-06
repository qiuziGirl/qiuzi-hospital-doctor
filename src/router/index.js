import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/error404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/appointment',
    children: [
      {
        path: 'appointment',
        name: 'Appointment',
        component: () => import('@/views/appointment'),
        meta: { title: 'Appointment', icon: 'appointment' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/record',
    children: [
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/record'),
        meta: { title: 'Record', icon: 'record' }
      }
    ]
  }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
