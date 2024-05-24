<template>
  <div class="session-scheduler">
    <h3>Upcoming Sessions</h3>
    <ul>
      <li v-for="session in sessions" :key="session.id">
        {{ session.date }} - {{ session.topic }}
      </li>
    </ul>
    <form @submit.prevent="addSession">
      <div>
        <label for="topic">Topic:</label>
        <input type="text" id="topic" v-model="newSession.topic" required />
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" id="date" v-model="newSession.date" required />
      </div>
      <button type="submit">Add Session</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  name: 'SessionScheduler',
  props: {
    sessions: Array,
  },
  data() {
    return {
      newSession: {
        topic: '',
        date: '',
      },
    };
  },
  methods: {
    async addSession() {
      try {
        const sessionRef = await db
          .collection('studyGroups')
          .doc(this.$route.params.id)
          .collection('sessions')
          .add(this.newSession);
        this.newSession = { topic: '', date: '' };
        this.$emit('session-added', sessionRef.id);
      } catch (error) {
        console.error('Error adding session:', error);
      }
    },
  },
};
</script>

<style scoped>
.session-scheduler {
  padding: 2em;
}
</style>
