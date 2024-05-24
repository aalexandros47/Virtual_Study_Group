<!-- Navigation bar component that shows different links based on authentication state. -->

<!-- This component provides the navigation bar for the application. It shows different navigation links based on the user's authentication status. For authenticated users, it displays links to create a study group, view study groups, and log out. For unauthenticated users, it displays links to log in and register. -->

<template>
  <nav class="bg-blue-600 p-4 text-white">
    <div class="container mx-auto flex justify-between">
      <router-link to="/" class="text-lg font-bold"
        >Virtual Study Group</router-link
      >
      <div>
        <router-link v-if="!isAuthenticated" to="/login" class="ml-4"
          >Login</router-link
        >
        <router-link v-if="!isAuthenticated" to="/register" class="ml-4"
          >Register</router-link
        >
        <router-link
          v-if="isAuthenticated"
          to="/create-study-group"
          class="ml-4"
          >Create Study Group</router-link
        >
        <router-link v-if="isAuthenticated" to="/study-groups" class="ml-4"
          >Study Groups</router-link
        >
        <button v-if="isAuthenticated" @click="logout" class="ml-4">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  computed: {
    isAuthenticated() {
      return this.$store.state.user !== null;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #007bff;
  color: white;
}
</style>
