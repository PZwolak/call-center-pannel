import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useTicketsStore } from '@/stores/tickets'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Testowy mounting store i logowanie zgłoszeń
const store = useTicketsStore()
store.fetchTickets()
store.$subscribe(() => {
  if (!store.loading) {
    console.log('Tickets:', store.tickets)
  }
})

app.mount('#app')
