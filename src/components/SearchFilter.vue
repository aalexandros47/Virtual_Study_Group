<template>
  <div class="search-filter">
    <input
      type="text"
      v-model="searchQuery"
      @input="filterGroups"
      placeholder="Search study groups..."
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
      this.$store.dispatch('filterStudyGroups', this.searchQuery);
    },
  },
};
</script>

<style scoped>
.search-filter {
  margin-bottom: 1em;
}
input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
