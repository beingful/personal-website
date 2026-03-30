<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseLinkButton from '@/components/ui/BaseLinkButton.vue';
import { useViewportMotion } from '@/composables/useViewportMotion';
import type { LinkItem, StatItem } from '@/types/content';

interface HeroSectionProps {
  readonly name: string;
  readonly role: string;
  readonly intro: string;
  readonly location: string;
  readonly links: readonly LinkItem[];
  readonly stats: readonly StatItem[];
}

defineProps<HeroSectionProps>();

const { motionRef, motionStyle } = useViewportMotion();
</script>

<template>
  <section
    ref="motionRef"
    class="relative overflow-visible pb-[30%] pt-[12%] sm:pb-[20%] lg:overflow-hidden lg:py-[12%]"
    :style="motionStyle"
  >
    <BaseContainer class="grid gap-[10%] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:items-end">
      <div class="min-w-0 space-y-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
          Personal website
        </p>
        <div class="space-y-6">
          <h1 class="max-w-[14ch] font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] text-[rgb(var(--heading-text-color))]">
            {{ name }}
          </h1>
          <p class="max-w-[30rem] text-[clamp(1.25rem,2.2vw,1.8rem)] leading-[1.35] text-[rgb(var(--body-text-strong-color))]">
            {{ role }}
          </p>
          <p class="max-w-[36rem] text-base leading-8 text-[rgb(var(--body-text-color))] sm:text-lg">
            {{ intro }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <BaseLinkButton
            v-for="(link, index) in links"
            :key="link.href"
            :href="link.href"
            :label="link.label"
            :variant="index === 0 ? 'primary' : 'secondary'"
          />
        </div>
      </div>

      <div class="min-w-0 rounded-[2rem] border border-[rgb(var(--card-border-color)/0.5)] bg-[rgb(var(--card-background-color)/0.8)] p-[7%] shadow-soft backdrop-blur sm:p-[8%]">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
          Snapshot
        </p>
        <p class="mt-5 text-base leading-7 text-[rgb(var(--body-text-color))]">
          {{ location }}
        </p>
        <dl class="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-1 lg:gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="min-w-0 rounded-[1.25rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-strong-color)/0.52)] px-3 py-4 sm:px-4 lg:rounded-none lg:border-0 lg:border-t lg:bg-transparent lg:px-0 lg:py-6 lg:first:border-t-0 lg:first:pt-0"
          >
            <dt class="break-words text-[0.68rem] uppercase leading-5 tracking-[0.1em] text-[rgb(var(--muted-text-color))] sm:text-xs lg:text-sm lg:tracking-[0.18em]">
              {{ stat.label }}
            </dt>
            <dd class="mt-2 break-words font-display text-[clamp(1.2rem,4.6vw,1.875rem)] leading-tight text-[rgb(var(--heading-text-color))] lg:text-[clamp(1.6rem,6vw,1.875rem)]">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
    </BaseContainer>
  </section>
</template>
