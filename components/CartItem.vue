<template>
    <div class="flex items-center p-4 bg-[#24182a] border border-[#3a2740] rounded-lg">
        <div class="w-16 h-16 rounded-md overflow-hidden mr-4 bg-[#1a121f] p-2">
            <img :src="item.image" alt="Package Image" class="w-full h-full object-contain" />
        </div>

        <div class="flex-grow">
            <p class="font-bold text-lg">{{ item.name }}</p>
            <p class="text-purple-400 font-semibold">{{ $n(item.in_basket.price, "currency") }}</p>
            <p class="text-sm text-gray-400 mt-1" v-if="item.in_basket.gift_username">
                <i18n-t keypath="cart.item.gift_to" tag="span">
                    <template #username>
                        <span class="font-bold">{{ item.in_basket.gift_username }}</span>
                    </template>
                </i18n-t>
            </p>
        </div>

        <div class="flex items-center gap-4">
            <span class="font-bold text-lg">
                {{
                    $t("cart.item.quantity", {
                        quantity: item.in_basket.quantity,
                    })
                }}
            </span>

            <Button
                size="sm"
                @click="emit('remove', item.id)"
                :loading="loading"
                variant="clear"
                icon="remove"
                iconSize="24px"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PackageInBasket } from "~/types";

interface CartItemProps {
    item: PackageInBasket;
    loading: boolean;
}

defineProps<CartItemProps>();

const emit = defineEmits<{
    remove: [id: number];
}>();
</script>

<style scoped>
/* All styles are now handled by Tailwind CSS */
</style>