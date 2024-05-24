<template>
  <div class="user-auth">
    <h2 v-if="mode === 'login'">Login</h2>
    <h2 v-if="mode === 'register'">Register</h2>
    <form @submit.prevent="submit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">
        {{ mode === 'login' ? 'Login' : 'Register' }}
      </button>
    </form>
    <div v-if="authMessage" class="auth-message">{{ authMessage }}</div>
    <div v-if="authError" class="auth-error">{{ authError }}</div>
  </div>
</template>

<script>
export default {
  name: 'UserAuth',
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
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
      if (this.mode === 'login') {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
      } else if (this.mode === 'register') {
        this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style scoped>
.user-auth {
  padding: 2em;
}
.auth-message {
  color: green;
  margin-top: 1em;
}
.auth-error {
  color: red;
  margin-top: 1em;
}
</style>
