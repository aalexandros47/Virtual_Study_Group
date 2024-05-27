<!-- This component allows users to share resources (e.g., links, documents) within a
study group. It enables users to post and view shared resources, facilitating
collaboration and resource sharing among group members. -->

<template>
  <div class="resource-share">
    <h3 class="text-2xl font-bold mb-4">Resources</h3>
    <div
      v-for="resource in resources"
      :key="resource.id"
      class="resource bg-gray-200 p-4 rounded-lg mb-2"
    >
      <p>
        <strong>{{ resource.user }}</strong
        >: <a :href="resource.link" target="_blank">{{ resource.link }}</a>
      </p>
    </div>
    <form @submit.prevent="shareResource">
      <input
        type="text"
        v-model="newResource"
        placeholder="Share a resource link..."
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mt-2"
      >
        Share
      </button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  name: 'ResourceShare',
  props: {
    groupId: String,
  },
  data() {
    return {
      resources: [],
      newResource: '',
    };
  },
  methods: {
    async shareResource() {
      if (this.newResource.trim() === '') return;

      const resource = {
        user: this.$store.state.currentUser.email,
        link: this.newResource,
        timestamp: new Date(),
      };

      await db
        .collection('groups')
        .doc(this.groupId)
        .collection('resources')
        .add(resource);
      this.newResource = '';
    },
    fetchResources() {
      db.collection('groups')
        .doc(this.groupId)
        .collection('resources')
        .orderBy('timestamp')
        .onSnapshot((snapshot) => {
          this.resources = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
    },
  },
  created() {
    this.fetchResources();
  },
};
</script>

<style scoped>
.resource-share {
  margin-top: 2em;
}
.resource {
  margin-bottom: 1em;
}
</style>
