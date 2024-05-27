// Entry point of the Vue.js application, sets up the Vue instance, router, and store

import { createApp } from 'vue';
import MainApp from './MainApp.vue';
import router from './router';
import store from './store';
import './assets/styles.css';

createApp(MainApp).use(store).use(router).mount('#root');
