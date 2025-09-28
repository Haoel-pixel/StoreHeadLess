<template>
    <component
        v-bind="$attrs"
        :is="tag"
        :class="classes"
        @click="clicked"
        :disabled="disabled || loading"
        :to="to"
        :external="external"
    >
        <span v-if="prependIcon || $slots.prepend" class="mr-2">
            <slot name="prepend">
                <Icon v-if="prependIcon" :name="prependIcon" :size="iconSize" />
            </slot>
        </span>

        <span class="flex-grow text-center">
            <Loader v-if="loading"></Loader>
            <template v-else>
                <Icon v-if="icon" :name="icon" :size="iconSize" />
                <slot></slot>
            </template>
        </span>

        <span v-if="appendIcon || $slots.append" class="ml-2">
            <slot name="append">
                <Icon v-if="appendIcon" :name="appendIcon" :size="iconSize" />
            </slot>
        </span>
    </component>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from "#app";
import { NuxtLink } from "#components";

interface ButtonProps {
    variant?:
        | "primary"
        | "secondary"
        | "tertiary"
        | "links"
        | "success"
        | "clear";
    size?: "sm" | "md" | "lg";
    tag?: "button" | "input" | "a";
    to?: string | NuxtLinkProps["to"];
    external?: NuxtLinkProps["external"];
    disabled?: boolean;
    block?: boolean;
    loading?: boolean;
    icon?: string;
    iconSize?: string;
    prependIcon?: string;
    appendIcon?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    size: "md",
    variant: "primary",
    iconSize: "20px",
});

const variantClasses = {
    primary: 'bg-[#4b2a66] hover:bg-[#5a3a76] text-white',
    secondary: 'bg-[#24182a] hover:bg-[#3a2740] text-white border border-[#3a2740]',
    tertiary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    links: 'bg-transparent hover:underline text-purple-400',
    clear: 'bg-transparent hover:bg-gray-700/50',
};

const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
};

const classes = computed(() => [
    'inline-flex items-center justify-center font-bold rounded-md transition-colors duration-200 ease-in-out',
    variantClasses[props.variant],
    sizeClasses[props.size],
    {
        'w-full': props.block,
        'opacity-50 cursor-not-allowed': props.disabled || props.loading,
        'pointer-events-none': props.loading,
        'px-2': !!props.icon,
    },
]);

const tag = computed(() => {
    if (props.to) {
        return NuxtLink;
    } else {
        return props.tag;
    }
});

const emit = defineEmits(["click"]);

const clicked = (event: Event) => {
    if (props.disabled || props.loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    emit("click", event);
};
</script>

<style scoped>
/* All styles are now handled by Tailwind CSS */
</style>