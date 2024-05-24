<template>
  <div
    class="home-page bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex items-center justify-center text-white"
  >
    <div class="text-center p-8">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-bounce">
        Welcome to Virtual Study Group
      </h1>
      <p class="text-xl md:text-2xl mb-6">
        Collaborate, learn, and grow together.
      </p>
      <router-link
        to="/study-groups"
        class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >Join a Study Group</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home-page {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
}
</style>
