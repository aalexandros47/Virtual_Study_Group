<template>
  <div class="study-groups-page bg-gray-100 min-h-screen p-8">
    <h2 class="text-3xl font-bold mb-4">Study Groups</h2>
    <SearchFilter />
    <div
      v-for="group in filteredStudyGroups"
      :key="group.id"
      class="study-group bg-white shadow-lg rounded-lg p-6 mb-6"
    >
      <h3 class="text-2xl font-semibold mb-2">{{ group.name }}</h3>
      <p class="text-gray-700 mb-4">{{ group.description }}</p>
      <p class="text-gray-500 mb-4">
        Expires at: {{ group.expirationDate.toDate().toLocaleString() }}
      </p>
      <router-link
        :to="`/study-group/${group.id}`"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >Join Group</router-link
      >
      <button
        @click="likeGroup(group.id)"
        class="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Like ({{ group.likes || 0 }})
      </button>
    </div>
    <div v-if="authMessage" class="auth-message text-green-500">
      {{ authMessage }}
    </div>
    <div v-if="authError" class="auth-error text-red-500">{{ authError }}</div>
  </div>
</template>

<script>
import SearchFilter from '../components/SearchFilter.vue';

export default {
  name: 'StudyGroups',
  components: {
    SearchFilter,
  },
  computed: {
    filteredStudyGroups() {
      return this.$store.state.filteredStudyGroups;
    },
    authMessage() {
      return this.$store.state.authMessage;
    },
    authError() {
      return this.$store.state.authError;
    },
    isAuthenticated() {
      return this.$store.state.user;
    },
  },
  methods: {
    likeGroup(groupId) {
      this.$store.dispatch('likeStudyGroup', groupId);
    },
  },
  created() {
    this.$store.commit('setAuthMessage', null);
    this.$store.commit('setAuthError', null);
    this.$store.dispatch('fetchStudyGroups');
  },
};
</script>

<style scoped>
.study-groups-page {
  padding: 2em;
}
.study-group {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
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
