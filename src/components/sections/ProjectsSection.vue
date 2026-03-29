<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseTagList from '@/components/ui/BaseTagList.vue';
import type { ProjectItem } from '@/types/content';

interface ProjectsSectionProps {
  readonly items: readonly ProjectItem[];
}

defineProps<ProjectsSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="projects"
      eyebrow="Selected Projects"
      title="A foundation built for case studies, experiments, and future depth."
      description="The project grid uses shared data contracts so you can expand it later without rewriting the section architecture."
    >
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="item in items"
          :key="item.title"
          class="flex h-full flex-col rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color))] p-[8%] shadow-soft"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
            {{ item.category }}
          </p>
          <h3 class="mt-4 font-display text-2xl text-[rgb(var(--heading-text-color))]">
            {{ item.title }}
          </h3>
          <p class="mt-4 flex-1 text-base leading-7 text-[rgb(var(--body-text-color))]">
            {{ item.description }}
          </p>
          <div class="mt-6">
            <BaseTagList :items="item.tags" />
          </div>
          <a
            v-if="item.repositoryHref"
            :href="item.repositoryHref"
            class="mt-6 inline-flex text-sm font-semibold text-[rgb(var(--heading-text-color))] transition hover:text-[rgb(var(--accent-text-strong-color))]"
            target="_blank"
            rel="noreferrer"
          >
            View Project
          </a>
          <a
            v-if="item.href"
            :href="item.href"
            class="mt-3 inline-flex text-sm font-semibold text-[rgb(var(--heading-text-color))] transition hover:text-[rgb(var(--accent-text-strong-color))]"
            target="_blank"
            rel="noreferrer"
          >
            View Website
          </a>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
