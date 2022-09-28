import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import layoutRoutes from './layoutRoutes';

const routes: RouteRecordRaw[] = [
  ...layoutRoutes,
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
