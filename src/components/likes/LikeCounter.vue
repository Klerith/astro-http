<template>
  <div v-if="isLoading">Loading...</div>

  <button v-else @click="likePost">Like Counter</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  postId: string;
}

const props = defineProps<Props>();
// console.log(props.postId);

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

const likePost = () => {
  console.log('+1 like');
};

const getCurrentLikes = () => {
  console.log('fetching likes');
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
