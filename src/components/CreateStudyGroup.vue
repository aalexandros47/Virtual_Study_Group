<template>
  <div
    class="create-study-group bg-white shadow-md rounded-lg p-8 m-4 max-w-md mx-auto"
  >
    <h2 class="text-2xl font-bold mb-4">Create Study Group</h2>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Group Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-gray-700"
          >Description:</label
        >
        <textarea
          id="description"
          v-model="description"
          required
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="duration" class="block text-gray-700"
          >Duration (hours):</label
        >
        <input
          type="number"
          id="duration"
          v-model="duration"
          required
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Create Group
      </button>
    </form>
    <div
      v-if="authMessage"
      ref="authMessage"
      class="auth-message mt-4 text-green-500"
    >
      {{ authMessage }}
    </div>
    <div v-if="authError" class="auth-error mt-4 text-red-500">
      {{ authError }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateStudyGroup',
  data() {
    return {
      name: '',
      description: '',
      duration: 1,
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
      const studyGroup = {
        name: this.name,
        description: this.description,
        duration: this.duration,
      };
      this.$store.dispatch('createStudyGroup', studyGroup).then(() => {
        if (!this.authError) {
          this.$refs.authMessage.style.display = 'block';
        }
      });
    },
  },
  created() {
    this.$store.commit('setAuthMessage', null);
    this.$store.commit('setAuthError', null);
  },
};
</script>

<style scoped>
.create-study-group {
  padding: 2em;
}
.auth-message {
  color: green;
  margin-top: 1em;
  display: none;
}
.auth-error {
  color: red;
  margin-top: 1em;
}
</style>
