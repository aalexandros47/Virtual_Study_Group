<!-- Page for creating new study groups. -->
<!-- Detailed view for a specific study group, including video, discussion, and resource sharing functionalities. -->

<template>
  <div
    class="create-group-page flex items-center justify-center min-h-screen bg-gray-50"
  >
    <div
      class="bg-white shadow-md rounded-lg p-8 m-4 max-w-sm w-full animate-fade-in"
    >
      <h2 class="text-2xl font-bold mb-4">Create Group</h2>
      <form @submit.prevent="submitGroup">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Group Name:</label>
          <input
            type="text"
            id="name"
            v-model="groupName"
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
            v-model="groupDescription"
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
            v-model="groupDuration"
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
  name: 'CreateGroup',
  data() {
    return {
      groupName: '',
      groupDescription: '',
      groupDuration: 1,
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
    submitGroup() {
      const newGroupData = {
        name: this.groupName,
        description: this.groupDescription,
        duration: this.groupDuration,
      };
      this.$store.dispatch('createGroup', newGroupData).then(() => {
        if (!this.errorMsg) {
          this.$router.push('/groups');
        }
      });
    },
  },
};
</script>

<style scoped>
.create-group-page {
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
