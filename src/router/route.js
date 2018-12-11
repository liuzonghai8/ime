import Login from '../views/Login'
import Index from '../views/Index'

 const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
      },
    {
        path: '/',
        component: ()=>import('../views/layout'),
        //component: ()=>import('../views/Layout1'),
        redirect: "/index/dashboard",
        children: [
          {
            path: '/index/dashboard',component: Index
          },
          {
            path: '/sys/user',component: ()=>import('../views/sys/user')
          },
          {
            path: '/sys/auth',component: ()=>import('../views/sys/auth')
          },
          {
            path: '/sys/role',component: ()=>import('../views/sys/role')
          },
          {
            path: '/sys/dept',component: ()=>import('../views/sys/dept')
          },
          {
            path: '/trade/test',component: ()=>import('../views/test')
          },
        ]
       
      }
]

export default routes;