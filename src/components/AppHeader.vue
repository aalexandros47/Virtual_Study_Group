<template>
  <header
    class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg"
  >
    <nav class="flex justify-around items-center">
      <router-link to="/" class="hover:text-yellow-500 transition duration-300"
        >Home</router-link
      >
      <router-link
        to="/study-groups"
        class="hover:text-yellow-500 transition duration-300"
        >Study Groups</router-link
      >
      <router-link
        to="/create-study-group"
        class="hover:text-yellow-500 transition duration-300"
        >Create Study Group</router-link
      >
      <router-link
        v-if="!user"
        to="/login"
        class="hover:text-yellow-500 transition duration-300"
        >Login</router-link
      >
      <router-link
        v-if="!user"
        to="/register"
        class="hover:text-yellow-500 transition duration-300"
        >Register</router-link
      >
      <button
        v-if="user"
        @click="logout"
        class="hover:text-yellow-500 transition duration-300"
      >
        Logout
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style scoped>
/* Add custom scoped styles if needed */
</style>
