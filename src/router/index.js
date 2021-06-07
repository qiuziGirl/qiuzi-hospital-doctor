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
      },
      {
        path: 'patient-profile/:id(\\d+)',
        name: 'PatientProfile',
        component: () => import('@/views/patientProfile'),
        meta: { title: 'Patient Profile', noCache: true },
        hidden: true
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
      },
      {
        path: 'record/create/:id(\\d+)',
        name: 'RecordCreate',
        component: () => import('@/views/record/RecordCreate'),
        meta: { title: 'Record Create', noCache: true, activeMenu: '/record' },
        hidden: true
      },
      {
        path: 'record/edit/:id(\\d+)',
        name: 'RecordEdit',
        component: () => import('@/views/record/RecordEdit'),
        meta: { title: 'Record Edit', noCache: true, activeMenu: '/record' },
        hidden: true
      },
      {
        path: 'record/:id(\\d+)',
        name: 'RecordDetail',
        component: () => import('@/views/record/RecordDetail'),
        meta: { title: 'Record Detail', noCache: true, activeMenu: '/record' },
        hidden: true
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    hidden: true,
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile'),
        meta: { title: 'Profile', noCache: true }
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
