<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { ProfileLinkItem } from '@/types/content';

interface LinksSectionProps {
  readonly items: readonly ProfileLinkItem[];
}

defineProps<LinksSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="links"
      eyebrow="Links"
      title="Professional profiles and public work."
      description="Browse code, container images, and professional background through the links below."
    >
      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="item in items"
          :key="item.label"
          class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.8)] p-[8%] shadow-soft"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
            {{ item.label }}
          </p>
          <a
            :href="item.href"
            target="_blank"
            rel="noreferrer"
            class="mt-4 inline-flex text-base leading-7 text-[rgb(var(--heading-text-color))] transition hover:text-[rgb(var(--accent-text-strong-color))]"
          >
            {{ item.value }}
          </a>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
