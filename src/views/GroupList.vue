<template>
  <div class="group-list-page bg-gray-50 min-h-screen p-8">
    <h2 class="text-3xl font-bold mb-4">Study Groups</h2>
    <SearchFilter @filter="filterGroups" />
    <div
      v-for="group in paginatedGroups"
      :key="group.id"
      class="group-item bg-white shadow-lg rounded-lg p-6 mb-6 animate-fade-in"
    >
      <h3 class="text-2xl font-semibold mb-2">{{ group.name }}</h3>
      <p class="text-gray-700 mb-4">{{ group.description }}</p>
      <p class="text-gray-500 mb-4">
        Expires at: {{ group.expiryDate.toDate().toLocaleString() }}
      </p>
      <router-link
        :to="`/group/${group.id}`"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >Join Group</router-link
      >
      <button
        @click="likeGroup(group.id)"
        class="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Like ({{ group.likes || 0 }})
      </button>
      <button
        @click="deleteGroup(group.id)"
        class="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Delete
      </button>
    </div>
    <GroupPagination
      :totalItems="filteredGroups.length"
      :itemsPerPage="itemsPerPage"
      @page-changed="handlePageChange"
    />
    <div v-if="authMsg" class="auth-message text-green-500">{{ authMsg }}</div>
    <div v-if="errorMsg" class="auth-error text-red-500">{{ errorMsg }}</div>
  </div>
</template>

<script>
import SearchFilter from '../components/SearchFilter.vue';
import GroupPagination from '../components/GroupPagination.vue';

export default {
  name: 'GroupList',
  components: {
    SearchFilter,
    GroupPagination,
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10, // Changed to 10 items per page
    };
  },
  computed: {
    groups() {
      return this.$store.state.groups;
    },
    filteredGroups() {
      return this.groups.filter(
        (group) =>
          group.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          group.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedGroups() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredGroups.slice(start, end);
    },
    authMsg() {
      return this.$store.state.authMsg;
    },
    errorMsg() {
      return this.$store.state.errorMsg;
    },
  },
  methods: {
    filterGroups(query) {
      this.searchQuery = query;
    },
    likeGroup(groupId) {
      this.$store.dispatch('likeGroup', groupId);
    },
    deleteGroup(groupId) {
      this.$store.dispatch('deleteGroup', groupId);
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  created() {
    this.$store.dispatch('fetchGroups');
  },
};
</script>

<style scoped>
.group-list-page {
  padding: 2em;
}

.group-item {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.auth-message {
  color: green;
  margin-top: 1em;
}

.auth-error {
  color: red;
  margin-top: 1em;
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
