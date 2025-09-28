<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="relative">
      <div class="bg-[linear-gradient(180deg,#100218_0%,#0b0610_60%)] h-48 md:h-56 flex items-center">
        <div class="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center w-full gap-6">
          <!-- IP + Discord Centered -->
          <div class="grid grid-cols-2 gap-6 w-full max-w-3xl">
            <div @click="copyIp" class="bg-[#24182a] border border-[#3a2740] rounded-lg p-6 flex items-center justify-center gap-2 text-xl font-bold cursor-pointer hover-card">
              <i class="bi bi-hdd-network text-purple-400 text-2xl"></i> {{ appConfig.serverIp }}
            </div>
            <a :href="appConfig.discordUrl" target="_blank" class="bg-[#24182a] border border-[#3a2740] rounded-lg p-6 flex items-center justify-center gap-2 text-xl font-bold hover-card cursor-pointer text-blue-400 no-underline">
              <i class="bi bi-discord text-2xl"></i> Join Discord
            </a>
          </div>
        </div>
      </div>

      <!-- Promo slim bar -->
      <div v-if="appConfig.sale" class="max-w-6xl mx-auto px-6 -mt-8 relative">
        <div class="bg-[#24182a]/80 border border-[#3a2740] rounded-lg p-4 shadow-lg flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-[#8b2eff] to-[#5a00ff] flex items-center justify-center text-sm font-bold">{{ appConfig.sale.percentage }}%</div>
            <div>
              <div class="font-bold text-white">{{ appConfig.sale.title }}</div>
              <div class="text-sm text-gray-300">{{ appConfig.sale.current }} / {{ appConfig.sale.target }} {{ appConfig.sale.currency }}</div>
            </div>
          </div>
          <button @click="openCart" class="bg-[#4b2a66] px-4 py-2 rounded-md hover-card">Cart</button>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="max-w-6xl mx-auto px-6 mt-10 pb-16">
        <slot />
    </main>

    <footer class="text-center text-gray-500 py-8">© {{ new Date().getFullYear() }} {{ appConfig.storeName }}</footer>
  </div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
const toastStore = useToastStore();
const uiStore = useUIStore();

const copyIp = () => {
  if (!appConfig.serverIp) return;
  navigator.clipboard.writeText(appConfig.serverIp).then(() => {
    toastStore.addToast('Server IP copied to clipboard!', {
        type: 'success',
    });
  });
};

const openCart = () => {
    uiStore.toggleItem('cart-sidebar');
};
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background-color: #0b0610;
  color: white;
}
.hover-card {
  transition: all 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
}
a.no-underline {
    text-decoration: none;
}
</style>