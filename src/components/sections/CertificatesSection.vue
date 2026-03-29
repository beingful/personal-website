<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { CertificateItem } from '@/types/content';

interface CertificatesSectionProps {
  readonly items: readonly CertificateItem[];
}

defineProps<CertificatesSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="certificates"
      eyebrow="Certificates"
      title="Verified cloud platform knowledge."
      description="Credentials and certifications taken directly from the resume."
    >
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="item in items"
          :key="item.title"
          class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.75)] p-[8%] shadow-soft"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
            {{ item.issuer }}
          </p>
          <h3 class="mt-4 font-display text-2xl leading-tight text-[rgb(var(--heading-text-color))]">
            {{ item.title }}
          </h3>
          <a
            v-if="item.href"
            :href="item.href"
            target="_blank"
            rel="noreferrer"
            class="mt-5 inline-flex text-sm font-semibold text-[rgb(var(--heading-text-color))] transition hover:text-[rgb(var(--accent-text-strong-color))]"
          >
            View credential
          </a>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
