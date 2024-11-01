<template>
  <div v-if="isLoading">Loading...</div>

  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>
  <button v-else @click="likePost">
    Likes <span>{{ likeCount }}</span>
  </button>

  {{ likeClicks }} clicks
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { actions } from 'astro:actions';
import debounce from 'lodash.debounce';
import confetti from 'canvas-confetti';

interface Props {
  postId: string;
}

const props = defineProps<Props>();
// console.log(props.postId);

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
  likeCount,
  debounce((newValue, oldValue) => {
    // console.log('likeCount changed from', oldValue, 'to', newValue);

    actions.updateLikeCount({
      increment: likeClicks.value,
      postId: props.postId,
    });

    likeClicks.value = 0;
  }, 500)
);

const likePost = async () => {
  // console.log('+1 like');
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

  // await actions.updateLikeCount({
  //   increment: 1,
  //   postId: props.postId,
  // });
};

const getCurrentLikes = async () => {
  console.log('fetching likes');
  // fetch likes from the server fetch(`/api/likes/${props.postId}`)
  const { data, error } = await actions.getLikes(props.postId);
  // const likes = await actions.getLikes.orThrow(props.postId)
  if (error) {
    return alert('Error fetching likes');
  }

  likeCount.value = data.likes || 0;
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
