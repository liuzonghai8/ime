import Home from '../views/Home'
import Login from '../views/layout/Login'

 const meuns = [
    {
        path: '/',
        name: 'login',
        component: Login
      },
    {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
]

export default meuns;