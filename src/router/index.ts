import Pace from 'pace-js'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const siteLoadComplete = (): void => {
  Pace.on("done", (): void => {
    document.body.className = "";
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    beforeEnter: [siteLoadComplete],
    component: HomePage
  }, {
    path: "/:catchAll(.*)",
    component: HomePage
  }]
});

export default router;
