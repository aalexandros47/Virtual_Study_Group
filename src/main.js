// Entry point of the Vue.js application, sets up the Vue instance, router, and store

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './main.css'; // Import Tailwind CSS
import './assets/tailwind.css';

createApp(App).use(store).use(router).mount('#app');
