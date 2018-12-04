import Login from '../views/Login'
import Index from '../views/index'

 const meuns = [
    {
        path: '/login',
        name: 'login',
        component: Login
      },
    {
        path: '/',
        component: ()=>import('../views/Layout'),
        //redirect: Index,
        children: [
          {
            path: '/home',component: Index
          }
        ]
       
      }
]

export default meuns;