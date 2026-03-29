import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import MainMenuPage from '@/pages/MainMenuPage.vue';

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main-menu',
    component: MainMenuPage
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }

    return {
      top: 0,
      behavior: 'smooth'
    };
  }
});
