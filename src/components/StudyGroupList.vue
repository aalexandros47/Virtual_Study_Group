<template>
  <div class="study-group-list p-4">
    <h2 class="text-2xl font-bold mb-4">Available Study Groups</h2>
    <ul class="space-y-4">
      <li
        v-for="group in studyGroups"
        :key="group.id"
        class="bg-white p-4 rounded shadow"
      >
        <router-link
          :to="'/study-group/' + group.id"
          class="text-blue-500 hover:underline"
          >{{ group.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StudyGroupList',
  computed: {
    studyGroups() {
      return this.$store.state.studyGroups;
    },
  },
  created() {
    this.$store.dispatch('fetchStudyGroups');
  },
};
</script>

<style scoped>
.study-group-list {
  padding: 2em;
}
</style>

<!-- <style scoped>
.study-group-list {
  padding: 2em;
}
</style> -->
