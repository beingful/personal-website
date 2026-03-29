<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import type { NavigationItem } from '@/types/content';

interface SiteHeaderProps {
  readonly name: string;
  readonly navigation: readonly NavigationItem[];
}

defineProps<SiteHeaderProps>();
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-white/40 bg-surface-50/85 backdrop-blur">
    <BaseContainer class="flex items-center justify-between gap-6 py-5">
      <a href="#" class="font-display text-lg font-semibold tracking-[0.04em] text-surface-900">
        {{ name }}
      </a>
      <nav aria-label="Primary">
        <ul class="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-surface-700 sm:gap-6">
          <li v-for="item in navigation" :key="item.href">
            <a class="transition hover:text-surface-900" :href="item.href">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </BaseContainer>
  </header>
</template>
