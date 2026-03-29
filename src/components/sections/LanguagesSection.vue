<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { LanguageItem } from '@/types/content';

interface LanguagesSectionProps {
  readonly items: readonly LanguageItem[];
}

defineProps<LanguagesSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="languages"
      eyebrow="Languages"
      title="Communication across teams and countries."
      description="Language proficiency taken from the resume."
    >
      <div class="grid gap-6 sm:grid-cols-2">
        <article
          v-for="item in items"
          :key="item.name"
          class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.8)] p-[8%] shadow-soft"
        >
          <h3 class="font-display text-3xl text-[rgb(var(--heading-text-color))]">
            {{ item.name }}
          </h3>
          <p class="mt-3 text-base leading-7 text-[rgb(var(--body-text-color))]">
            {{ item.proficiency }}
          </p>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
