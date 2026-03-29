<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { EducationItem } from '@/types/content';

interface EducationSectionProps {
  readonly items: readonly EducationItem[];
}

defineProps<EducationSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="education"
      eyebrow="Education"
      title="Formal training in computer science and applied mathematics."
      description="Academic background from Taras Shevchenko National University of Kyiv."
    >
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="item in items"
          :key="`${item.period}-${item.degree}`"
          class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-strong-color)/0.75)] p-[8%] shadow-soft"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
            {{ item.period }}
          </p>
          <h3 class="mt-4 font-display text-3xl text-[rgb(var(--heading-text-color))]">
            {{ item.degree }}
          </h3>
          <p class="mt-3 text-base font-medium text-[rgb(var(--body-text-strong-color))]">
            {{ item.institution }}
          </p>
          <p class="mt-3 text-base leading-7 text-[rgb(var(--body-text-color))]">
            {{ item.details }}
          </p>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
