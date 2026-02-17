<template>
  <section class="ticket-details">
    <div class="ticket-details__header">
      <Button @click="goBack"
              icon="pi pi-arrow-left"
              label="Powrót do listy"
              severity="secondary"
              text />
    </div>

    <div v-if="ticket"
         class="ticket-details__card">
      <h1 class="ticket-details__title">Zgłoszenie #{{ ticket.id }}</h1>

      <div class="ticket-details__grid">
        <div class="ticket-details__field">
          <span class="ticket-details__label">Klient</span>
          <span class="ticket-details__value">{{ ticket.customerName }}</span>
        </div>

        <div class="ticket-details__field">
          <span class="ticket-details__label">Temat</span>
          <span class="ticket-details__value">{{ ticket.subject }}</span>
        </div>

        <div class="ticket-details__field ticket-details__field--full">
          <span class="ticket-details__label">Opis</span>
          <p class="ticket-details__description">{{ ticket.description }}</p>
        </div>

        <div class="ticket-details__field">
          <span class="ticket-details__label">Status</span>
          <div class="ticket-details__status-edit">
            <Select v-model="status"
                    :options="statusOptions"
                    optionLabel="label"
                    optionValue="value"
                    class="ticket-details__select" />
            <Button @click="saveStatus"
                    :disabled="status === ticket.status"
                    label="Zapisz"
                    severity="success"
                    size="small" />
          </div>
        </div>

        <div class="ticket-details__field">
          <span class="ticket-details__label">Priorytet</span>
          <span :class="['ticket-details__priority', 'ticket-details__priority--' + ticket.priority]">
            {{ priorityLabel(ticket.priority) }}
          </span>
        </div>

        <div class="ticket-details__field">
          <span class="ticket-details__label">Data utworzenia</span>
          <span class="ticket-details__value">{{ formatDate(ticket.createdAt) }}</span>
        </div>
      </div>
    </div>

    <div v-else
         class="ticket-details__notfound">
      <i class="pi pi-exclamation-triangle"></i>
      <p>Nie znaleziono zgłoszenia</p>
      <Button @click="goBack"
              label="Wróć do listy"
              severity="primary" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '@ThemeStores/tickets'
import { TicketStatusEnum, TicketPriorityEnum, statusOptions, priorityLabel } from '@/js/types/model/enums'
import Select from 'primevue/select'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const store = useTicketsStore()

const ticketId = Number(route.params.id)
const ticket = computed(() => store.getTicketById(ticketId))
const status = ref<TicketStatusEnum>(ticket.value?.status ?? TicketStatusEnum.New)

const saveStatus = (): void => {
  if (ticket.value && status.value !== ticket.value.status) {
    store.updateTicketStatus(ticket.value.id, status.value)
  }
}

const goBack = (): void => {
  router.push({ name: 'tickets-list' })
}

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style lang="sass" scoped>
.ticket-details
  max-width: var(--cp-max-width-details)
  margin: var(--cp-spacing-xl) auto
  padding: var(--cp-spacing-lg)

  &__header
    margin-bottom: var(--cp-spacing-lg)

  &__card
    background: var(--cp-bg-primary)
    border-radius: var(--cp-border-radius-lg)
    box-shadow: var(--cp-shadow-lg)
    padding: var(--cp-spacing-xl)

  &__title
    margin: 0 0 var(--cp-spacing-xl) 0
    font-size: var(--cp-font-size-2xl)
    font-weight: var(--cp-font-weight-bold)
    color: var(--cp-text-primary)
    padding-bottom: var(--cp-spacing-lg)
    border-bottom: 1px solid var(--cp-border-color)

  &__grid
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: var(--cp-spacing-xl)

  &__field
    display: flex
    flex-direction: column
    gap: var(--cp-spacing-sm)

    &--full
      grid-column: 1 / -1

  &__label
    font-size: var(--cp-font-size-sm)
    font-weight: var(--cp-font-weight-semibold)
    color: var(--cp-text-muted)
    text-transform: uppercase
    letter-spacing: 0.05em

  &__value
    font-size: var(--cp-font-size-base)
    color: var(--cp-text-primary)
    font-weight: var(--cp-font-weight-medium)

  &__description
    margin: 0
    padding: var(--cp-spacing-md)
    background: var(--cp-bg-secondary)
    border-radius: var(--cp-border-radius-md)
    color: var(--cp-text-primary)
    line-height: 1.6

  &__status-edit
    display: flex
    align-items: center
    gap: var(--cp-spacing-sm)

  &__select
    min-width: 180px

  &__priority
    display: inline-flex
    align-items: center
    justify-content: center
    padding: var(--cp-badge-padding)
    border-radius: var(--cp-badge-border-radius)
    font-size: var(--cp-badge-font-size)
    font-weight: var(--cp-badge-font-weight)
    color: var(--cp-badge-text-color)
    min-width: var(--cp-badge-min-width)

    &--low
      background: var(--cp-priority-low-bg)

    &--medium
      background: var(--cp-priority-medium-bg)

    &--high
      background: var(--cp-priority-high-bg)

  &__notfound
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding: var(--cp-spacing-2xl)
    background: var(--cp-bg-primary)
    border-radius: var(--cp-border-radius-lg)
    box-shadow: var(--cp-shadow-lg)
    text-align: center

    i
      font-size: 4rem
      color: var(--cp-priority-high)
      margin-bottom: var(--cp-spacing-md)

    p
      font-size: var(--cp-font-size-xl)
      font-weight: var(--cp-font-weight-semibold)
      color: var(--cp-text-secondary)
      margin-bottom: var(--cp-spacing-lg)

@media (max-width: 768px)
  .ticket-details
    &__grid
      grid-template-columns: minmax(0, 1fr)

    &__field--full
      grid-column: 1
</style>
