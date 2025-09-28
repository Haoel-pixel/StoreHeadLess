<template>
  <div class="w-10 h-10 rounded-full overflow-hidden bg-[#1a121f] border-2 border-purple-400 flex items-center justify-center">
    <img v-if="imageUrl" :src="imageUrl" :alt="`${username}'s avatar`" class="w-full h-full object-cover" @error="onImageError">
    <div v-else class="text-white font-bold text-xs">?</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  username: string | null | undefined;
}>();

const imageUrl = ref<string | null>(null);
const fallbackUsed = ref(false);

const onImageError = () => {
  if (props.username && !fallbackUsed.value) {
    // Fallback to just the head if the full overlay fails
    fallbackUsed.value = true;
    imageUrl.value = `https://crafatar.com/avatars/${props.username}?size=40`;
  } else {
    imageUrl.value = null; // No image could be loaded
  }
};

watchEffect(() => {
  fallbackUsed.value = false;
  if (props.username) {
    imageUrl.value = `https://crafatar.com/avatars/${props.username}?size=40&overlay`;
  } else {
    imageUrl.value = null;
  }
});
</script>