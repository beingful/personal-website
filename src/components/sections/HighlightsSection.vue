<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { HighlightCard } from '@/types/content';

interface HighlightsSectionProps {
  readonly items: readonly HighlightCard[];
}

defineProps<HighlightsSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="work"
      eyebrow="How I Work"
      title="Product thinking, systems discipline, and a distinct visual point of view."
      description="I build with reuse and maintainability in mind, but I do not flatten the interface into something generic."
    >
      <div class="grid gap-6 lg:grid-cols-3">
        <article
          v-for="item in items"
          :key="item.title"
          class="rounded-[2rem] border border-surface-200 bg-white/75 p-[8%] shadow-soft"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-accent-700">
            {{ item.eyebrow }}
          </p>
          <h3 class="mt-4 font-display text-2xl leading-tight text-surface-900">
            {{ item.title }}
          </h3>
          <p class="mt-4 text-base leading-7 text-surface-700">
            {{ item.description }}
          </p>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
