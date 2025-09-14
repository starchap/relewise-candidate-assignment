import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const userId = localStorage.getItem('userId') || crypto.randomUUID();
localStorage.setItem('userId', userId);

const app = createApp(App)

app.use(router)

app.mount('#app')
