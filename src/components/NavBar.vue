<!-- Navigation bar component that shows different links based on authentication state. -->

<!-- This component provides the navigation bar for the application. It shows different navigation links based on the user's authentication status. For authenticated users, it displays links to create a study group, view study groups, and log out. For unauthenticated users, it displays links to log in and register. -->

<template>
  <nav class="bg-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-lg font-bold text-gray-800"
        >Study Group Hub</router-link
      >
      <div>
        <router-link
          v-if="!userLoggedIn"
          to="/login"
          class="ml-4 text-gray-600 hover:text-gray-800"
          >Login</router-link
        >
        <router-link
          v-if="!userLoggedIn"
          to="/signup"
          class="ml-4 text-gray-600 hover:text-gray-800"
          >Sign Up</router-link
        >
        <router-link
          v-if="userLoggedIn"
          to="/create-group"
          class="ml-4 text-gray-600 hover:text-gray-800"
          >Create Group</router-link
        >
        <router-link
          v-if="userLoggedIn"
          to="/groups"
          class="ml-4 text-gray-600 hover:text-gray-800"
          >Groups</router-link
        >
        <button
          v-if="userLoggedIn"
          @click="logoutUser"
          class="ml-4 text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    userLoggedIn() {
      return this.$store.state.currentUser !== null;
    },
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
