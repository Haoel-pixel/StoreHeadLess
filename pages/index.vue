<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-r from-[#7b09ff] to-[#a22bff] rounded-xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover-card">
      <div class="flex-1">
        <h2 class="text-4xl font-extrabold">DELUXE RANK</h2>
        <p class="text-gray-100 mt-3 max-w-md">Limited-Time Offer! Grab This Exclusive Package at a Special Discount – Purchase It Now!</p>
      </div>
      <div class="text-center">
        <div class="inline-block bg-[#ffffff22] rounded-md px-6 py-4 text-lg font-bold">Deluxe Rank</div>
        <div class="text-2xl font-extrabold mt-3">$19.99</div>
      </div>
      <div class="text-right">
        <div class="text-sm">HURRY UP! DEAL ENDS IN</div>
        <div class="flex gap-3 mt-3" id="countdown"></div>
      </div>
    </section>

    <!-- Categories and Packages -->
    <section v-for="category in categories" :key="category.id" class="mt-12">
        <h2 class="text-3xl font-extrabold mb-6">{{ category.name }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PackageCard
                v-for="pkg in category.packages"
                :key="pkg.id"
                :pkg="pkg"
            />
        </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
    ogTitle: t("index.hero.title"),
    description: t("index.hero.subtitle"),
    ogDescription: t("index.hero.subtitle"),
    ogImage: "/Eleria.png",
    twitterCard: "summary_large_image",
});

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});

import { onMounted, onUnmounted } from 'vue';

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});

// Countdown logic
const countdownElement = ref<HTMLElement | null>(null);
let intervalId: any;

onMounted(() => {
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  const updateCountdown = () => {
    const diff = Math.max(0, target.getTime() - new Date().getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
      countdownContainer.innerHTML = `
        <div class="bg-[#00000022] px-4 py-3 rounded-lg text-center">
          <div class="text-xl font-bold">${days}</div>
          <div class="text-xs text-gray-200">DAYS</div>
        </div>
        <div class="bg-[#00000022] px-4 py-3 rounded-lg text-center">
          <div class="text-xl font-bold">${hours}</div>
          <div class="text-xs text-gray-200">HOURS</div>
        </div>
        <div class="bg-[#00000022] px-4 py-3 rounded-lg text-center">
          <div class="text-xl font-bold">${minutes}</div>
          <div class="text-xs text-gray-200">MINUTES</div>
        </div>
        <div class="bg-[#00000022] px-4 py-3 rounded-lg text-center">
          <div class="text-xl font-bold">${seconds}</div>
          <div class="text-xs text-gray-200">SECONDS</div>
        </div>`;
    }
  };

  intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>