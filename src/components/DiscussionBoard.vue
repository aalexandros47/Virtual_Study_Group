<!-- This component provides a discussion board where users can post messages within a study group. It enables real-time communication through Firestore, allowing members of the study group to see and post messages. -->

<template>
  <div class="discussion-board">
    <h3 class="text-2xl font-bold mb-4">Discussion</h3>
    <div
      v-for="message in messages"
      :key="message.id"
      class="message bg-gray-200 p-4 rounded-lg mb-2"
    >
      <p>
        <strong>{{ message.user }}</strong
        >: {{ message.text }}
      </p>
    </div>
    <form @submit.prevent="postMessage">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Type your message..."
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mt-2"
      >
        Post
      </button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  name: 'DiscussionBoard',
  props: {
    groupId: String,
  },
  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },
  methods: {
    async postMessage() {
      if (this.newMessage.trim() === '') return;

      const message = {
        user: this.$store.state.currentUser.email,
        text: this.newMessage,
        timestamp: new Date(),
      };

      await db
        .collection('groups')
        .doc(this.groupId)
        .collection('messages')
        .add(message);
      this.newMessage = '';
    },
    fetchMessages() {
      db.collection('groups')
        .doc(this.groupId)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((snapshot) => {
          this.messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
    },
  },
  created() {
    this.fetchMessages();
  },
};
</script>

<style scoped>
.discussion-board {
  margin-top: 2em;
}
.message {
  margin-bottom: 1em;
}
</style>
