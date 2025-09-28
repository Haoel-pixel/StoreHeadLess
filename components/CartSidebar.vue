<template>
    <Sidebar v-model="isActive">
        <template #header>
            <div class="flex items-center justify-between w-full">
                <h4 class="text-2xl font-bold text-white">
                    {{ $t("cart.title") }}
                </h4>
                <Button
                    variant="clear"
                    @click="uiStore.toggleItem('cart-sidebar')"
                    icon="close"
                    iconSize="28px"
                />
            </div>
        </template>

        <Cart
            :items="basketStore.basket?.packages ?? []"
            :items-loading="basketStore.packagesLoading"
            @remove="basketStore.removePackageFromBasket($event)"
        />

        <template #actions>
            <div
                v-if="basketStore.basket?.total_price"
                class="flex justify-between my-6 text-2xl font-bold"
            >
                <span>{{ $t("cart.total") }}</span>
                <span>
                    {{ $n(basketStore.basket.total_price, "currency") }}
                </span>
            </div>

            <Button
                :disabled="
                    !basketStore.basket?.ident ||
                    basketStore.basket.packages.length === 0
                "
                @click="checkout"
                block
                variant="success"
                size="lg"
            >
                {{ $t("buttons.checkout") }}
            </Button>
        </template>
    </Sidebar>
</template>

<script setup lang="ts">
import { isClient } from "@vueuse/core";
import confetti from "canvas-confetti";
import { defu } from "defu";

const basketStore = useBasketStore();
const uiStore = useUIStore();
const toastStore = useToastStore();
const authStore = useAuthStore();

const isActive = computed({
    get() {
        return uiStore.isItemActive("cart-sidebar");
    },
    set(value) {
        uiStore.toggleItem("cart-sidebar", value);
    },
});

const { t } = useI18n();
const appConfig = useAppConfig();

const celebrate = () => {
    const duration = 300;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
};

const onPaymentComplete = () => {
    toastStore.addToast(
        t("checkout.completed.subtitle"),
        {
            type: "success",
        },
        t("checkout.completed.title"),
    );

    if (appConfig.confetti) {
        celebrate();
    }

    authStore.logout();
};

onMounted(async () => {
    await until(() => window?.Tebex).toBeTruthy();

    basketStore.getBasket();

    if (isClient) {
        window.Tebex.checkout.on("payment_complete", onPaymentComplete);

        window.Tebex.checkout.on("close", () => {
            if (basketStore.basket?.ident) {
                basketStore.getBasket();
            }
        });
    }
});

const checkout = async () => {
    if (!basketStore.basket?.ident) {
        return;
    }

    uiStore.toggleItem("cart-sidebar");

    const config = defu<TebexCheckoutConfig, [{ ident: string }]>(
        appConfig.tebexJsConfig,
        {
            ident: basketStore.basket?.ident,
        },
    );

    if (isClient) {
        window.Tebex.checkout.init(config);
        window.Tebex.checkout.launch();
    }
};

if (appConfig.showCartOnAdd) {
    watch(
        () => basketStore.packages,
        (newValue, oldValue) => {
            if (newValue.size > oldValue.size) {
                isActive.value = true;
            }
        },
    );
}
</script>

<style scoped>
/* All styles are now handled by Tailwind CSS */
</style>