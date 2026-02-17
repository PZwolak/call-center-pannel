import { createRouter, createWebHistory } from 'vue-router'
import TicketsList from '@/components/TicketsList.vue';

const TicketDetails = () => import('@/components/TicketDetails.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tickets-list',
      component: TicketsList,
    },
    {
      path: '/ticket/:id',
      name: 'ticket-details',
      component: TicketDetails,
      props: true,
    },
  ],
})

export default router
