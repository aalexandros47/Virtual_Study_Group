<template>
  <div class="study-group-detail">
    <h2>{{ studyGroup.name }}</h2>
    <p>{{ studyGroup.description }}</p>
    <SessionScheduler :sessions="sessions" @session-added="fetchSessions" />
    <ResourceShare :resources="resources" @resource-added="fetchResources" />
  </div>
</template>

<script>
import SessionScheduler from './SessionScheduler.vue';
import ResourceShare from './ResourceShare.vue';
import { db } from '../firebase';

export default {
  name: 'StudyGroupDetail',
  props: {
    studyGroup: Object,
  },
  components: {
    SessionScheduler,
    ResourceShare,
  },
  data() {
    return {
      sessions: [],
      resources: [],
    };
  },
  methods: {
    async fetchSessions() {
      try {
        const snapshot = await db
          .collection('studyGroups')
          .doc(this.$route.params.id)
          .collection('sessions')
          .get();
        this.sessions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    },
    async fetchResources() {
      try {
        const snapshot = await db
          .collection('studyGroups')
          .doc(this.$route.params.id)
          .collection('resources')
          .get();
        this.resources = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    },
  },
  created() {
    this.fetchSessions();
    this.fetchResources();
  },
};
</script>

<style scoped>
.study-group-detail {
  padding: 2em;
}
</style>
