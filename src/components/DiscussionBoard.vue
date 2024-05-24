<template>
  <div class="discussion-board">
    <h3 class="text-2xl font-bold mb-4">Discussion</h3>
    <div class="messages mb-4">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message bg-gray-200 p-2 rounded-lg mb-2"
      >
        <p class="font-bold">{{ message.username }}:</p>
        <p>{{ message.text }}</p>
      </div>
    </div>
    <form @submit.prevent="postMessage" class="message-form">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Type your message"
        class="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Post
      </button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';
import firebase from 'firebase/compat/app'; // Ensure firebase is imported

export default {
  name: 'DiscussionBoard',
  props: {
    studyGroupId: String,
  },
  data() {
    return {
      newMessage: '',
      messages: [],
    };
  },
  methods: {
    async postMessage() {
      if (this.newMessage.trim() === '') return;
      const message = {
        username: this.$store.state.user.email,
        text: this.newMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      try {
        await db
          .collection('studyGroups')
          .doc(this.studyGroupId)
          .collection('messages')
          .add(message);
        this.newMessage = '';
      } catch (error) {
        console.error('Error posting message:', error);
      }
    },
    fetchMessages() {
      db.collection('studyGroups')
        .doc(this.studyGroupId)
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
  max-width: 600px;
  margin: 0 auto;
}

.message-form {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 1em;
  border-radius: 8px;
  background-color: #f0f0f0;
  margin-bottom: 1em;
}

.message p {
  margin: 0;
}
</style>
