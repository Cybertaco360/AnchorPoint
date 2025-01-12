import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue'
import router from './router'
import App from './App.vue'
import './assets/index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE
    },
    cacheLocation: 'localstorage'
  })
)
app.mount('#app')