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
        component: ()=>import('../views/Layout'),
        redirect: "/index/dashboard",
        children: [
          {
            path: '/index/dashboard',component: Index
          },
          {
            path: '/sys/user',component: ()=>import('../views/sys/user')
          },
          {
            path: '/sys/role',component: ()=>import('../views/sys/role')
          }
        ]
       
      }
]

export default routes;