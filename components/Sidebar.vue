<template>
    <Overlay
        v-model="isActive"
        :transition="`slide-${position}`"
        :class="classes"
        ref="sidebar"
    >
        <div class="p-7">
            <slot name="header"></slot>
        </div>

        <div class="flex-grow px-7 py-8 overflow-auto">
            <slot></slot>
        </div>

        <div class="p-7">
            <slot name="actions"></slot>
        </div>
    </Overlay>
</template>

<script setup lang="ts">
interface SidebarProps {
    position?: "left" | "right";
}

const props = withDefaults(defineProps<SidebarProps>(), {
    position: "right",
});

const classes = computed(() => [
    'fixed top-0 h-screen h-[100dvh] w-full sm:w-[420px] z-50 bg-[#0b0610] border-l border-[#3a2740] flex flex-col',
    props.position === 'left' ? 'left-0 border-r border-l-0' : 'right-0',
]);

const isActive = defineModel();

const sidebar = ref<HTMLElement | null>(null);
</script>

<style scoped>
/* All styles are now handled by Tailwind CSS */
</style>