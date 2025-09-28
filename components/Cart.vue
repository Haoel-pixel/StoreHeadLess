<template>
    <div class="flex flex-col gap-4 w-full">
        <CartItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            :loading="itemsLoading.has(item.id)"
            @remove="emit('remove', $event)"
        />

        <div v-if="items.length === 0" class="text-center text-gray-400 py-16">
            {{ $t("cart.empty") }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PackageInBasket } from "~/types";

interface CartProps {
    items: PackageInBasket[];
    itemsLoading: Set<number>;
}

defineProps<CartProps>();

const emit = defineEmits<{
    remove: [id: number];
}>();
</script>

<style scoped>
/* All styles are now handled by Tailwind CSS */
</style>