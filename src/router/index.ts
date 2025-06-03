import { createRouter, createWebHistory } from 'vue-router'
import UserForm from "@/pages/UserForm/UserForm.vue";
import UserPreview from "@/pages/UserPreview/UserPreview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form',
      component: UserForm,
    },
  ],
})

export default router
