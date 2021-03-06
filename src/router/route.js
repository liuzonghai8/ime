import Login from '@/views/login/Login'
import Index from '@/views/index'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    //component: ()=>import('../views/Layout1'),
    redirect: "/index/dashboard",
    children: [
      {
        path: '/index/dashboard', component: Index
      },
      {
        path: '/sys/user', component: () => import('@/views/sys/user/User')
      },
      {
        path: '/sys/menu', component: () => import('@/views/sys/menu/Menu')
      },
      {
        path: '/sys/role', component: () => import('@/views/sys/role/Role')
      },
      {
        path: '/sys/dept', component: () => import('@/views/sys/dept/Dept')
      },
      {
        path: '/knowledge/problem', component: () => import('@/views/book/problem/Problem')
      },
      {
        path: '/ConsultationManagement/consultationRecord', component: () => import('@/views/consultation/ConsultationRecord')
      },

    ]

  }
]

export default routes;