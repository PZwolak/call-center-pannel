<template>
  <section :class="baseClass">
    <div :class="className('header')">
      <Button @click="goBack"
              icon="pi pi-arrow-left"
              label="Powrót do listy"
              severity="secondary"
              text />
    </div>

    <div v-if="store.loading" :class="className('loader')">
      <ProgressSpinner strokeWidth="4" />
      <p :class="className('loader-text')">Ładowanie zgłoszenia...</p>
    </div>

    <div v-else-if="ticket"
         :class="className('card')">
      <h1 :class="className('title')">Zgłoszenie #{{ ticket.id }}</h1>

      <div :class="className('grid')">
        <div :class="className('field')">
          <span :class="className('label')">Klient</span>
          <span :class="className('value')">{{ ticket.customerName }}</span>
        </div>

        <div :class="className('field')">
          <span :class="className('label')">Temat</span>
          <span :class="className('value')">{{ ticket.subject }}</span>
        </div>

        <div :class="[className('field'), className('field', 'full')]">
          <span :class="className('label')">Opis</span>
          <p :class="className('description')">{{ ticket.description }}</p>
        </div>

        <div :class="className('field')">
          <span :class="className('label')">Status</span>
          <div :class="className('status-edit')">
            <Select v-model="status"
                    :options="statusOptions"
                    optionLabel="label"
                    optionValue="value"
                    :class="className('select')" />
            <Button @click="saveStatus"
                    :disabled="status === ticket.status"
                    label="Zapisz"
                    severity="success"
                    size="small" />
          </div>
        </div>

        <div :class="className('field')">
          <span :class="className('label')">Priorytet</span>
          <span :class="[className('priority'), className('priority', ticket.priority)]">
            {{ priorityLabel(ticket.priority) }}
          </span>
        </div>

        <div :class="className('field')">
          <span :class="className('label')">Data utworzenia</span>
          <span :class="className('value')">{{ formatDate(ticket.createdAt) }}</span>
        </div>
      </div>
    </div>

    <div v-else
         :class="className('notfound')">
      <i :class="[className('notfound-icon'), 'pi', 'pi-exclamation-triangle']"></i>
      <p :class="className('notfound-text')">Nie znaleziono zgłoszenia</p>
      <Button @click="goBack"
              label="Wróć do listy"
              severity="primary" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '@ThemeStores/tickets'
import { TicketStatusEnum, TicketPriorityEnum, statusOptions, priorityLabel } from '@/js/types/model/enums'
import Select from 'primevue/select'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { formatDate } from '@/js/helpers/formatDate'
import useClass from '@/js/composables/useClass'

const { baseClass, className } = useClass('ticket-details')

const route = useRoute()
const router = useRouter()
const store = useTicketsStore()

const ticketId = Number(route.params.id)
const ticket = computed(() => store.getTicketById(ticketId))
const status = ref<TicketStatusEnum>(ticket.value?.status ?? TicketStatusEnum.New)

onMounted(() => {
  if (!store.tickets.length) {
    store.fetchTickets()
  }
})

watch(ticket, (value) => {
  if (value) {
    status.value = value.status
  }
})

const saveStatus = (): void => {
  if (ticket.value && status.value !== ticket.value.status) {
    store.updateTicketStatus(ticket.value.id, status.value)
  }
}

const goBack = (): void => {
  router.push({ name: 'tickets-list' })
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

  &__loader
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: var(--cp-spacing-md)
    padding: var(--cp-spacing-2xl)
    background: var(--cp-bg-primary)
    border-radius: var(--cp-border-radius-lg)
    box-shadow: var(--cp-shadow-lg)
    color: var(--cp-text-secondary)
    text-align: center

  &__loader-text
    font-size: var(--cp-font-size-lg)
    font-weight: var(--cp-font-weight-medium)

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

  &__notfound-icon
    font-size: 48px
    color: var(--cp-priority-high-bg)

  &__notfound-text
    font-size: var(--cp-font-size-xl)
    font-weight: var(--cp-font-weight-semibold)
    color: var(--cp-text-secondary)
    margin: var(--cp-spacing-md) 0 var(--cp-spacing-lg)

@media (max-width: var(--cp-breakpoint-md))
  .ticket-details
    padding: var(--cp-spacing-md)

    &__grid
      grid-template-columns: minmax(0, 1fr)

    &__status-edit
      flex-direction: column
      align-items: stretch

    &__select
      width: 100%

    &__field--full
      grid-column: 1
</style>
