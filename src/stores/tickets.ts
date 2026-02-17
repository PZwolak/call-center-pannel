import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { mockTickets } from '@/js/mocks/tickets';
import type { Ticket, TicketStatus } from '@/js/types/model/ticket';

const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<Array<Ticket>>([]);
  const loading = ref(false);

  const fetchTickets = (): void => {
    loading.value = true;
    tickets.value = [...mockTickets];
    loading.value = false;
  };

  const updateTicketStatus = (id: number, status: TicketStatus): void => {
    const ticket = tickets.value.find(ticket => ticket.id === id);

    if (ticket) {
      ticket.status = status;
    }
  };

  const filteredTickets = computed(() => (status: TicketStatus | 'all') => {
    return status === 'all'
      ? tickets.value
      : tickets.value.filter(ticket => ticket.status === status);
  });

  const getTicketById = computed(() => (id: number) => {
    return tickets.value.find(ticket => ticket.id === id);
  });

  return {
    tickets,
    loading,
    fetchTickets,
    updateTicketStatus,
    filteredTickets,
    getTicketById,
  };
});

export { useTicketsStore };
