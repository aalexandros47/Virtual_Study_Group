<!-- Registration page view that handles new user registration. -->
<template>
  <div
    class="signup-page flex items-center justify-center min-h-screen bg-gray-50"
  >
    <div
      class="bg-white shadow-md rounded-lg p-8 m-4 max-w-sm w-full animate-fade-in"
    >
      <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="newEmail"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            v-model="newPassword"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Sign Up
        </button>
      </form>
      <div v-if="authMsg" class="auth-message mt-4 text-green-500">
        {{ authMsg }}
      </div>
      <div v-if="errorMsg" class="auth-error mt-4 text-red-500">
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupView',
  data() {
    return {
      newEmail: '',
      newPassword: '',
    };
  },
  computed: {
    authMsg() {
      return this.$store.state.authMsg;
    },
    errorMsg() {
      return this.$store.state.errorMsg;
    },
  },
  methods: {
    handleSignup() {
      this.$store
        .dispatch('signup', {
          email: this.newEmail,
          password: this.newPassword,
        })
        .then(() => {
          if (!this.errorMsg) {
            this.$router.push('/login');
          }
        });
    },
  },
};
</script>

<style scoped>
.signup-page {
  background-color: #f8f9fa;
}

.auth-message {
  color: green;
}

.auth-error {
  color: red;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
