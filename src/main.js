// Entry point of the Vue.js application, sets up the Vue instance, router, and store

import { createApp } from 'vue';
import MainApp from './MainApp.vue';
import router from './router'; // Ensure these paths are correct
import store from './store'; // Ensure these paths are correct
import './assets/styles.css'; // Ensure the path is correct

createApp(MainApp).use(store).use(router).mount('#root'); // Ensure the selector matches the div in index.html
