<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { ExperienceItem } from '@/types/content';

interface ExperienceSectionProps {
  readonly items: readonly ExperienceItem[];
}

defineProps<ExperienceSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="experience"
      eyebrow="Experience"
      title="Shipping software with room for change."
      description="My preference is deliberate architecture: typed boundaries, composable UI, and implementation decisions that make the next release easier."
    >
      <div class="grid gap-6">
        <article
          v-for="item in items"
          :key="`${item.period}-${item.title}`"
          class="grid gap-6 rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-strong-color)/0.75)] p-[7%] lg:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)]"
        >
          <div class="space-y-2">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
              {{ item.period }}
            </p>
            <h3 class="font-display text-2xl text-[rgb(var(--heading-text-color))]">
              {{ item.title }}
            </h3>
            <p class="text-base text-[rgb(var(--muted-text-color))]">
              {{ item.company }}
            </p>
          </div>
          <div class="space-y-5">
            <p class="text-base leading-7 text-[rgb(var(--body-text-color))]">
              {{ item.summary }}
            </p>
            <ul class="grid gap-3 text-sm leading-6 text-[rgb(var(--body-text-color))] sm:text-base">
              <li v-for="achievement in item.achievements" :key="achievement" class="flex gap-3">
                <span class="mt-2 h-2 w-2 flex-none rounded-full bg-accent-500" aria-hidden="true" />
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
