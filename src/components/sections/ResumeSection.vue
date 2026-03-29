<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseLinkButton from '@/components/ui/BaseLinkButton.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import type { ResumeDocument } from '@/types/content';

interface ResumeSectionProps {
  readonly resume: ResumeDocument;
}

const props = defineProps<ResumeSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="resume"
      eyebrow="Resume"
      :title="props.resume.title"
      :description="props.resume.summary"
    >
      <div class="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <article class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.8)] p-[8%] shadow-soft">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
            CV Access
          </p>
          <h3 class="mt-4 font-display text-2xl text-[rgb(var(--heading-text-color))]">
            Review online or download the PDF.
          </h3>
          <p class="mt-4 text-base leading-7 text-[rgb(var(--body-text-color))]">
            The embedded preview keeps the resume visible inside the website, while the actions below provide direct viewing and download behavior.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <BaseLinkButton
              v-for="(action, index) in props.resume.actions"
              :key="action.label"
              :href="action.href"
              :label="action.label"
              :download="action.download"
              :target="action.target"
              :rel="action.rel"
              :variant="index === 0 ? 'primary' : 'secondary'"
            />
          </div>
        </article>

        <div class="overflow-hidden rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.85)] shadow-soft">
          <div class="border-b border-[rgb(var(--card-border-color)/0.45)] px-[5%] py-[4%]">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted-text-color))]">
              PDF Preview
            </p>
          </div>
          <iframe
            :src="props.resume.previewHref"
            :title="`${props.resume.title} preview`"
            class="min-h-[70vh] w-full border-0 bg-surface-50"
          />
        </div>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
