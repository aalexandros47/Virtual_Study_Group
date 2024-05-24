<template>
  <div
    class="study-group-page bg-white shadow-lg rounded-lg p-8 m-4 max-w-4xl mx-auto"
  >
    <h2 class="text-3xl font-bold mb-4">{{ studyGroup.name }}</h2>
    <div class="tabs">
      <button
        @click="selectTab('video')"
        :class="{ 'active-tab': selectedTab === 'video' }"
      >
        Video
      </button>
      <button
        @click="selectTab('discussion')"
        :class="{ 'active-tab': selectedTab === 'discussion' }"
      >
        Discussion
      </button>
      <button
        @click="selectTab('resources')"
        :class="{ 'active-tab': selectedTab === 'resources' }"
      >
        Resources
      </button>
    </div>
    <div v-if="selectedTab === 'video'" class="video-container mb-4">
      <div class="video-grid">
        <video ref="myVideo" class="video-element" autoplay playsinline></video>
        <video
          v-for="(stream, index) in remoteStreams"
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
    <div v-if="selectedTab === 'discussion'" class="discussion-container">
      <DiscussionBoard :studyGroupId="groupId" />
    </div>
    <div v-if="selectedTab === 'resources'" class="resources-container">
      <ResourceShare :studyGroupId="groupId" />
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
  name: 'StudyGroup',
  components: {
    DiscussionBoard,
    ResourceShare,
  },
  data() {
    return {
      groupId: this.$route.params.id,
      studyGroup: {},
      selectedTab: 'video',
      socket: null,
      myPeer: null,
      videoStream: null,
      audioStream: null,
      remoteStreams: [],
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    async toggleCamera() {
      if (!this.videoStream) {
        try {
          this.videoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          this.$refs.myVideo.srcObject = this.videoStream;
          this.initializePeer();
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
    initializePeer() {
      this.socket = io('https://your-socket-server'); // Replace with your socket server URL
      this.myPeer = new SimplePeer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: this.videoStream,
      });

      this.myPeer.on('signal', (data) => {
        this.socket.emit('signal', data);
      });

      this.myPeer.on('stream', (stream) => {
        this.remoteStreams.push(stream);
      });

      this.socket.on('signal', (data) => {
        this.myPeer.signal(data);
      });
    },
    async fetchStudyGroup() {
      try {
        const groupDoc = await db
          .collection('studyGroups')
          .doc(this.groupId)
          .get();
        this.studyGroup = groupDoc.data();
      } catch (error) {
        console.error('Error fetching study group:', error);
      }
    },
  },
  created() {
    this.fetchStudyGroup();
  },
};
</script>

<style scoped>
.study-group-page {
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
