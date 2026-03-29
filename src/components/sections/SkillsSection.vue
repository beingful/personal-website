<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseTagList from '@/components/ui/BaseTagList.vue';
import type { SkillGroup } from '@/types/content';

interface SkillsSectionProps {
  readonly items: readonly SkillGroup[];
}

defineProps<SkillsSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="skills"
      eyebrow="Skills"
      title="Technical depth across backend, cloud, integration, and delivery workflows."
      description="Grouped by purpose so the section stays readable as the skill set evolves."
    >
      <div class="grid gap-6 lg:grid-cols-2">
        <article
          v-for="item in items"
          :key="item.title"
          class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.8)] p-[7%] shadow-soft"
        >
          <h3 class="font-display text-2xl text-[rgb(var(--heading-text-color))]">
            {{ item.title }}
          </h3>
          <div class="mt-5">
            <BaseTagList :items="item.items" />
          </div>
        </article>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
