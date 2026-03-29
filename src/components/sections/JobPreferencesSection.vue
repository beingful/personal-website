<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { JobPreferenceItem } from '@/types/content';

interface JobPreferencesSectionProps {
  readonly items: readonly JobPreferenceItem[];
}

defineProps<JobPreferencesSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="looking-for"
      eyebrow="What I’m Looking For"
      title="A role with strong engineering standards, meaningful responsibility, and room to grow."
      description="The best opportunities combine backend-focused product work, collaborative teams, and exposure to a wide range of technologies and problem spaces."
    >
      <div class="grid gap-6 lg:grid-cols-2">
        <article
          v-for="item in items"
          :key="item.title"
          class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.8)] p-[8%] shadow-soft"
        >
          <h3 class="font-display text-2xl text-[rgb(var(--heading-text-color))]">
            {{ item.title }}
          </h3>
          <p class="mt-4 text-base leading-7 text-[rgb(var(--body-text-color))]">
            {{ item.description }}
          </p>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
