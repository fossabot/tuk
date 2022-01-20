import { useRouteGuard } from '@/auth/useRouterGuard'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import propsParser from 'vue-router-parse-props'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Trig from '@/views/Trig.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: useRouteGuard,
  },
  {
    path: '/trig/:trigid',
    name: 'trig',
    component: Trig,
    props: propsParser({ trigid: Number }),
    beforeEnter: useRouteGuard,
  },
  {
    path: '/user/:userid',
    name: 'user',
    component: Profile, // TODO: Sort this out
    props: propsParser({ userid: Number }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
