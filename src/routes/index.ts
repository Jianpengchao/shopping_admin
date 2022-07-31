import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'layout',
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import("../layout/index.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/login/index.vue"),
      meta: {
        requiresAuth: false,
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
