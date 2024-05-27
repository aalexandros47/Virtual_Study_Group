<template>
  <div id="app" class="bg-gray-50 min-h-screen">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'MainApp',
  components: {
    NavBar,
  },
};
</script>

<style>
/* Global styles */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
  color: #333;
}
</style>
