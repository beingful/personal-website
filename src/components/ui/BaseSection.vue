<script setup lang="ts">
import { useViewportMotion } from '@/composables/useViewportMotion';

interface BaseSectionProps {
  readonly id?: string;
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
}

defineProps<BaseSectionProps>();

const { motionRef, motionStyle } = useViewportMotion();
</script>

<template>
  <section :id="id" ref="motionRef" class="py-[10%]" :style="motionStyle">
    <slot name="header">
      <header class="max-w-[42rem] space-y-[3%]">
        <p
          v-if="eyebrow"
          class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]"
        >
          {{ eyebrow }}
        </p>
        <h2 class="font-display text-[clamp(2rem,4vw,3.75rem)] leading-[0.95] text-[rgb(var(--heading-text-color))]">
          {{ title }}
        </h2>
        <p v-if="description" class="text-base leading-7 text-[rgb(var(--body-text-color))] sm:text-lg">
          {{ description }}
        </p>
      </header>
    </slot>
    <div class="mt-[6%]">
      <slot />
    </div>
  </section>
</template>
