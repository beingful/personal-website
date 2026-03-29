<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary';

interface BaseLinkButtonProps {
  readonly href: string;
  readonly label: string;
  readonly variant?: ButtonVariant;
  readonly download?: string;
  readonly target?: '_blank' | '_self';
  readonly rel?: string;
}

const props = withDefaults(defineProps<BaseLinkButtonProps>(), {
  variant: 'primary'
});

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    'bg-[rgb(var(--heading-text-color))] text-[rgb(var(--inverse-text-color))] hover:bg-[rgb(var(--body-text-strong-color))] focus-visible:outline-[rgb(var(--heading-text-color))]',
  secondary:
    'border border-[rgb(var(--card-border-color)/0.7)] bg-[rgb(var(--card-background-color)/0.7)] text-[rgb(var(--heading-text-color))] hover:border-[rgb(var(--muted-text-color))] hover:bg-[rgb(var(--card-background-color)/0.95)] focus-visible:outline-[rgb(var(--muted-text-color))]'
};
</script>

<template>
  <a
    :href="href"
    :download="download"
    :target="target"
    :rel="rel"
    class="inline-flex items-center justify-center rounded-full px-[1.25rem] py-[0.9rem] text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="variantClassMap[props.variant]"
  >
    {{ label }}
  </a>
</template>
