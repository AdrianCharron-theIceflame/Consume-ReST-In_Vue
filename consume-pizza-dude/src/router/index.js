import AddPizza from '@/views/AddPizza.vue'
import PizzaView from '@/views/PizzaView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      name: `home`,
      component: PizzaView
    },
    {
      path: `/AddPizza`,
      name: `addPizza`,
      component: AddPizza
    }
  ],
})

export default router
