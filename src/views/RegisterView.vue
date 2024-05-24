<template>
  <div
    class="register-page min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
  >
    <div class="bg-white shadow-md rounded-lg p-8 m-4 max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Register
        </button>
      </form>
      <div v-if="authMessage" class="auth-message mt-4 text-green-500">
        {{ authMessage }}
      </div>
      <div v-if="authError" class="auth-error mt-4 text-red-500">
        {{ authError }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    authMessage() {
      return this.$store.state.authMessage;
    },
    authError() {
      return this.$store.state.authError;
    },
  },
  methods: {
    submit() {
      this.$store
        .dispatch('register', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          if (!this.authError) {
            this.$router.push('/login');
          }
        });
    },
  },
};
</script>

<style scoped>
.register-page {
  background: linear-gradient(to right, #4a90e2, #50b7f5);
}
.auth-message {
  color: green;
}
.auth-error {
  color: red;
}
</style>
