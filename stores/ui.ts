export const useUIStore = defineStore("ui", () => {
    const overlayedItems = ref<string[]>([]);
    const showOverlay = computed(() => overlayedItems.value.length > 0 || isLoginModalActive.value);

    const isLoginModalActive = ref(false);

    return {
        showOverlay,
        isLoginModalActive,
        toggleLoginModal(value?: boolean) {
            isLoginModalActive.value = value ?? !isLoginModalActive.value;
        },
        toggleItem(item: string, value?: boolean) {
            const show = value ?? !overlayedItems.value.includes(item);
            if (show) {
                overlayedItems.value = [...overlayedItems.value, item];
            } else {
                overlayedItems.value = overlayedItems.value.filter(
                    (i) => i !== item,
                );
            }
        },
        isItemActive(item: string) {
            return overlayedItems.value.includes(item);
        },
        hideAll() {
            overlayedItems.value = [];
            isLoginModalActive.value = false;
        },
    };
});
