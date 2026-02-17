<template>
  <section :class="baseClass">
    <h1 :class="className('title')">Zgłoszenia klientów</h1>

    <div v-if="store.loading" :class="className('loader')">
      <ProgressSpinner strokeWidth="4" />
      <p :class="className('loader-text')">Ładowanie zgłoszeń...</p>
    </div>

    <template v-else>
      <div :class="className('filters')">
        <label for="status-filter" :class="className('label')">Status:</label>
        <Dropdown
          id="status-filter"
          v-model="statusFilter"
          :options="[{ label: 'Wszystkie', value: 'all' }, ...statusOptions]"
          optionLabel="label"
          optionValue="value"
          :class="className('dropdown')" />
      </div>
      <DataTable
        :value="tickets"
        :class="className('table')"
        dataKey="id"
        @rowClick="({ data }) => goToDetails(data)"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        responsiveLayout="stack"
        breakpoint="768px"
        sortField="id"
        :sortOrder="1">
        <Column field="id"
                header="ID"
                style="width: 60px"
                sortable />
        <Column field="customerName"
                header="Imię i nazwisko"
                sortable />
        <Column field="subject"
                header="Temat"
                sortable />
        <Column field="status"
                header="Status"
                sortable>
          <template #body="{ data }">
            <span :class="[className('status'), className('status', data.status)]">
              {{ statusOptions.find(opt => opt.value === data.status)?.label || data.status }}
            </span>
          </template>
        </Column>
        <Column field="priority"
                header="Priorytet"
                sortable>
          <template #body="{ data }">
            <span :class="[className('priority'), className('priority', data.priority)]">
              {{ priorityLabel(data.priority) }}
            </span>
          </template>
        </Column>
      </DataTable>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketsStore } from '@ThemeStores/tickets'
import { TicketStatusEnum, TicketPriorityEnum, statusOptions, priorityLabel } from '@/js/types/model/enums'
import type { Ticket } from '@/js/types/model/ticket'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import ProgressSpinner from 'primevue/progressspinner'
import useClass from '@/js/composables/useClass'

const { baseClass, className } = useClass('tickets-list')

const router = useRouter()
const store = useTicketsStore()
const statusFilter = ref<TicketStatusEnum | 'all'>('all')

const tickets = computed(() => store.filteredTickets(statusFilter.value))

const goToDetails = (ticket: Ticket): void => {
  router.push({ name: 'ticket-details', params: { id: ticket.id } })
}

onMounted(() => {
  if (!store.tickets.length) {
    store.fetchTickets()
  }
})
</script>

<style lang="sass" scoped>
@use '@/styles/variables' as *

.tickets-list
  max-width: var(--cp-max-width-list)
  margin: var(--cp-spacing-xl) auto
  padding: var(--cp-spacing-lg)

  &__title
    font-size: var(--cp-font-size-3xl)
    font-weight: var(--cp-font-weight-bold)
    margin-bottom: var(--cp-spacing-xl)
    color: var(--cp-text-primary)
    text-align: center

  &__filters
    display: flex
    align-items: center
    gap: var(--cp-spacing-md)
    margin-bottom: var(--cp-spacing-lg)
    justify-content: flex-start

  &__label
    font-size: var(--cp-font-size-base)
    font-weight: var(--cp-font-weight-semibold)
    color: var(--cp-text-primary)

  &__dropdown
    min-width: 180px

  &__table
    width: 100%
    background: var(--cp-bg-primary)
    border-radius: var(--cp-border-radius-lg)
    box-shadow: var(--cp-shadow-md)
    font-size: var(--cp-font-size-base)
    overflow: hidden
    cursor: pointer

  &__status,
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

  &__status
    &--new
      background: var(--cp-status-new-bg)
    &--in_progress
      background: var(--cp-status-in-progress-bg)
    &--closed
      background: var(--cp-status-closed-bg)

  &__priority
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
    box-shadow: var(--cp-shadow-md)
    color: var(--cp-text-secondary)
    text-align: center

  &__loader-text
    font-size: var(--cp-font-size-lg)
    font-weight: var(--cp-font-weight-medium)

@media (max-width: $cp-breakpoint-md)
  .tickets-list
    padding: var(--cp-spacing-md)

    &__title
      font-size: var(--cp-font-size-2xl)
      margin-bottom: var(--cp-spacing-lg)

    &__filters
      flex-direction: column
      align-items: stretch
      gap: var(--cp-spacing-sm)

    &__dropdown
      width: 100%

    &__table
      font-size: var(--cp-font-size-sm)

      :deep(.p-datatable-thead)
        display: none

      :deep(.p-datatable-tbody > tr > td)
        display: flex
        align-items: center
        justify-content: space-between
        gap: var(--cp-spacing-sm)
        padding: var(--cp-spacing-sm) var(--cp-spacing-md)

      :deep(.p-datatable-tbody > tr > td .p-column-title)
        font-weight: var(--cp-font-weight-semibold)
        color: var(--cp-text-secondary)

      :deep(.p-datatable-tbody > tr)
        border-bottom: 1px solid var(--cp-border-color)
</style>
