<template>
  <Overlay v-model="isActive">
    <div class="bg-[#0b0610] border border-[#3a2740] rounded-lg p-8 w-full max-w-md mx-auto mt-20 relative">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold">Login with Minecraft</h3>
        <Button variant="clear" @click="isActive = false" icon="close" iconSize="28px" />
      </div>
      <p class="text-gray-400 mb-6">Enter your Minecraft username to log in and continue with your purchase.</p>
      <div class="flex flex-col gap-4">
        <input v-model="username" type="text" placeholder="Minecraft Username" class="bg-[#24182a] border border-[#3a2740] rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg">
        <Button @click="handleLogin" :loading="loading" size="lg" block>Login</Button>
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isActive = defineModel<boolean>();

const authStore = useAuthStore();
const toastStore = useToastStore();
const username = ref('');
const loading = ref(false);

const handleLogin = async () => {
    if (!username.value.trim()) {
        toastStore.addToast('Please enter a username.', { type: 'error' });
        return;
    }
    loading.value = true;
    try {
        await authStore.login(username.value);
        toastStore.addToast(`Logged in as ${username.value}!`, { type: 'success' });
        isActive.value = false; // Close modal on success
    } catch (error) {
        toastStore.addToast('Login failed. Please check the username.', { type: 'error' });
    } finally {
        loading.value = false;
    }
};
</script>