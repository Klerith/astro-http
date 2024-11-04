<template>
  <span v-if="isLoading">Loading...</span>

  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>

  <button v-else @click="likePost">Likes {{ likeCount }}</button>

  <span>{{ likeClicks }}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import confetti from 'canvas-confetti';

interface Props {
  postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

const likePost = async () => {
  console.log('like +1');

  likeCount.value += 1;
  likeClicks.value += 1;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
};

const getCurrentLikes = async () => {
  console.log(`fetching likes ${props.postId}`);

  isLoading.value = false;
};

getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: #4a3f9a;
}
</style>
