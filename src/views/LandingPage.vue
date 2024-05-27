<template>
  <div
    class="landing-page flex items-center justify-center min-h-screen relative"
  >
    <div class="text-center p-8 max-w-2xl animate-fade-in z-10">
      <h1 class="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Study Group Hub
      </h1>
      <p class="text-gray-700 mb-8">
        Join or create study groups, share resources, and collaborate with your
        peers in real-time.
      </p>
      <router-link
        to="/signup"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >Get Started</router-link
      >
    </div>
    <div class="animated-background absolute inset-0">
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.landing-page {
  background-color: #f8f9fa;
  overflow: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.ball {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 255, 0.5);
  border-radius: 50%;
  animation: bounce 5s infinite ease-in-out;
}

.ball:nth-child(1) {
  top: 20%;
  left: 15%;
  width: 15px;
  height: 15px;
  animation-duration: 4s;
}

.ball:nth-child(2) {
  top: 50%;
  left: 25%;
  width: 25px;
  height: 25px;
  animation-duration: 6s;
}

.ball:nth-child(3) {
  top: 70%;
  left: 35%;
  width: 10px;
  height: 10px;
  animation-duration: 5s;
}

.ball:nth-child(4) {
  top: 40%;
  left: 75%;
  width: 20px;
  height: 20px;
  animation-duration: 3.5s;
}

.ball:nth-child(5) {
  top: 60%;
  left: 85%;
  width: 30px;
  height: 30px;
  animation-duration: 4.5s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-100px) translateX(100px);
  }
}
</style>
