<template>
  <div class="join-study-group">
    <h2>Join Study Group</h2>
    <SearchFilter />
    <!-- Ensure this component is being used -->
    <div
      v-for="group in filteredStudyGroups"
      :key="group.id"
      class="study-group"
    >
      <h3>{{ group.name }}</h3>
      <p>{{ group.description }}</p>
      <p>Expires at: {{ group.expirationDate.toDate().toLocaleString() }}</p>
      <button v-if="user" @click="joinGroup(group.id)">Join Group</button>
      <button v-if="!user" @click="redirectToRegister">Register to Join</button>
      <button @click="likeGroup(group.id)">
        Like ({{ group.likes || 0 }})
      </button>
    </div>
    <div v-if="authMessage" class="auth-message">{{ authMessage }}</div>
    <div v-if="authError" class="auth-error">{{ authError }}</div>
  </div>
</template>

<script>
import SearchFilter from './SearchFilter.vue';

export default {
  name: 'JoinStudyGroup',
  components: {
    SearchFilter, // Ensure the component is registered here
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
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    joinGroup(groupId) {
      this.$store.dispatch('joinStudyGroup', groupId);
    },
    likeGroup(groupId) {
      this.$store.dispatch('likeStudyGroup', groupId);
    },
    redirectToRegister() {
      this.$router.push('/register');
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
.join-study-group {
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
