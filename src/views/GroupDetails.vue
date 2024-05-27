<!-- Detailed view for a specific study group, including video, discussion, and resource sharing functionalities -->
<template>
  <div
    class="group-details-page bg-white shadow-lg rounded-lg p-8 m-4 max-w-4xl mx-auto"
  >
    <h2 class="text-3xl font-bold mb-4">{{ group.name }}</h2>
    <div class="tabs">
      <button
        @click="setTab('video')"
        :class="{ 'active-tab': activeTab === 'video' }"
      >
        Video
      </button>
      <button
        @click="setTab('discussion')"
        :class="{ 'active-tab': activeTab === 'discussion' }"
      >
        Discussion
      </button>
      <button
        @click="setTab('resources')"
        :class="{ 'active-tab': activeTab === 'resources' }"
      >
        Resources
      </button>
    </div>
    <div v-if="activeTab === 'video'" class="video-container mb-4">
      <div class="video-grid">
        <video
          ref="localVideo"
          class="video-element"
          autoplay
          playsinline
        ></video>
        <video
          v-for="(stream, index) in remoteVideoStreams"
          :key="index"
          :ref="'remoteVideo' + index"
          class="video-element"
          autoplay
          playsinline
        ></video>
      </div>
      <button
        @click="toggleCamera"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Toggle Camera
      </button>
      <button
        @click="toggleMicrophone"
        class="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Toggle Microphone
      </button>
    </div>
    <div v-if="activeTab === 'discussion'" class="discussion-container">
      <DiscussionBoard :groupId="groupId" />
    </div>
    <div v-if="activeTab === 'resources'" class="resources-container">
      <ResourceShare :groupId="groupId" />
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { io } from 'socket.io-client';
import SimplePeer from 'simple-peer';
import DiscussionBoard from '../components/DiscussionBoard.vue';
import ResourceShare from '../components/ResourceShare.vue';

export default {
  name: 'GroupDetails',
  components: {
    DiscussionBoard,
    ResourceShare,
  },
  data() {
    return {
      groupId: this.$route.params.id,
      group: {},
      activeTab: 'video',
      socket: null,
      peerConnection: null,
      videoStream: null,
      audioStream: null,
      remoteVideoStreams: [],
    };
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
    },
    async toggleCamera() {
      if (!this.videoStream) {
        try {
          this.videoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          this.$refs.localVideo.srcObject = this.videoStream;
          this.initializePeerConnection();
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      } else {
        this.videoStream.getTracks().forEach((track) => track.stop());
        this.videoStream = null;
      }
    },
    async toggleMicrophone() {
      if (!this.audioStream) {
        try {
          this.audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const audioElement = document.getElementById('audio');
          audioElement.srcObject = this.audioStream;
        } catch (error) {
          console.error('Error accessing microphone:', error);
        }
      } else {
        this.audioStream.getTracks().forEach((track) => track.stop());
        this.audioStream = null;
      }
    },
    initializePeerConnection() {
      this.socket = io('https://your-socket-server-url'); // Replace with your socket server URL
      this.peerConnection = new SimplePeer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: this.videoStream,
      });

      this.peerConnection.on('signal', (data) => {
        this.socket.emit('signal', data);
      });

      this.peerConnection.on('stream', (stream) => {
        this.remoteVideoStreams.push(stream);
      });

      this.socket.on('signal', (data) => {
        this.peerConnection.signal(data);
      });
    },
    async fetchGroupDetails() {
      try {
        const groupDoc = await db.collection('groups').doc(this.groupId).get();
        this.group = groupDoc.data();
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    },
  },
  created() {
    this.fetchGroupDetails();
  },
};
</script>

<style scoped>
.group-details-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.tabs button {
  margin: 0 1em;
  padding: 0.5em 1em;
  font-weight: bold;
  cursor: pointer;
}

.active-tab {
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

.video-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1em;
  position: relative;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

video {
  width: 100%;
  border-radius: 8px;
}

.controls {
  margin-bottom: 1em;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.discussion-board,
.resource-share {
  flex: 1;
  margin: 0 1em;
}
</style>
