<!-- Component for filtering and searching study groups. -->

<!-- This component provides a search and filter functionality for study groups. Users can search for specific study groups based on keywords, helping them quickly find relevant groups to join. -->

<template>
  <div class="search-filter">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search study groups..."
      @input="filterGroups"
      class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    filterGroups() {
      this.$emit('filter', this.searchQuery);
    },
  },
};
</script>

<style scoped>
.search-filter {
  margin-bottom: 2em;
}
</style>
