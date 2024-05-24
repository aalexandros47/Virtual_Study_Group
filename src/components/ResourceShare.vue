<!-- This component allows users to share resources (e.g., links, documents) within a
study group. It enables users to post and view shared resources, facilitating
collaboration and resource sharing among group members. -->

<template>
  <div class="resource-share">
    <h3 class="text-2xl font-bold mb-4">Resources</h3>
    <div class="resources mb-4">
      <div
        v-for="resource in resources"
        :key="resource.id"
        class="resource bg-gray-200 p-2 rounded-lg mb-2"
      >
        <a
          :href="resource.url"
          target="_blank"
          class="font-bold text-blue-500"
          >{{ resource.name }}</a
        >
      </div>
    </div>
    <form @submit.prevent="postResource" class="resource-form">
      <input
        type="text"
        v-model="newResourceName"
        placeholder="Resource name"
        class="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        type="url"
        v-model="newResourceUrl"
        placeholder="Resource URL"
        class="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Update Resource
      </button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';
import firebase from 'firebase/compat/app'; // Ensure firebase is imported

export default {
  name: 'ResourceShare',
  props: {
    studyGroupId: String,
  },
  data() {
    return {
      newResourceName: '',
      newResourceUrl: '',
      resources: [],
    };
  },
  methods: {
    async postResource() {
      if (
        this.newResourceName.trim() === '' ||
        this.newResourceUrl.trim() === ''
      )
        return;
      const resource = {
        name: this.newResourceName,
        url: this.newResourceUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      try {
        await db
          .collection('studyGroups')
          .doc(this.studyGroupId)
          .collection('resources')
          .add(resource);
        this.newResourceName = '';
        this.newResourceUrl = '';
      } catch (error) {
        console.error('Error posting resource:', error);
      }
    },
    fetchResources() {
      db.collection('studyGroups')
        .doc(this.studyGroupId)
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
  max-width: 600px;
  margin: 0 auto;
}

.resource-form {
  display: flex;
  flex-direction: column;
}

.resource {
  padding: 1em;
  border-radius: 8px;
  background-color: #f0f0f0;
  margin-bottom: 1em;
}

.resource a {
  color: #007bff;
  text-decoration: none;
}

.resource a:hover {
  text-decoration: underline;
}
</style>
