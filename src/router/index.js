import {createWebHistory, createRouter} from "vue-router";

export const constantRoutes = [
  {
    path: '/',
    component: () => import('../views/index.vue')
  },
  {
    path: '/animation',
      component: () => import('../views/animation.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(tpo, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return {
        top: 0,
      }
    }
  },
});

export default router;
