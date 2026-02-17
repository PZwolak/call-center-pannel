import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from '@primeuix/themes/lara'
import App from './App.vue'
import router from './router'
import { useTicketsStore } from '@/stores/tickets'
import 'primeicons/primeicons.css'
import '@/styles/variables.sass'
import '@/styles/base.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: '.app-dark',
    }
  }
})

const store = useTicketsStore()
store.fetchTickets()
store.$subscribe(() => {
  if (!store.loading) {
    console.log('Tickets:', store.tickets)
  }
})

app.mount('#app')
