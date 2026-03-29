<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import ThemeModeSwitch from '@/components/ui/ThemeModeSwitch.vue';
import type { NavigationItem } from '@/types/content';
import type { ThemeMode } from '@/types/theme';

interface TopMenuDockProps {
  readonly name: string;
  readonly navigation: readonly NavigationItem[];
  readonly activeThemeMode: ThemeMode;
}

interface TopMenuDockEmits {
  (eventName: 'update:activeThemeMode', value: ThemeMode): void;
}

const props = defineProps<TopMenuDockProps>();
const emit = defineEmits<TopMenuDockEmits>();

const handleThemeModeUpdate = (mode: ThemeMode): void => {
  emit('update:activeThemeMode', mode);
};
</script>

<template>
  <div class="sticky top-0 z-30 px-4 pt-4">
    <BaseContainer class="w-[min(100%-2rem,86rem)]">
      <header
        class="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[rgb(var(--dock-border-color)/0.18)] bg-[rgb(var(--dock-background-color)/0.82)] px-[4%] py-[1.1rem] shadow-soft backdrop-blur"
      >
        <a href="/" class="font-display text-lg font-semibold tracking-[0.04em] text-[rgb(var(--heading-text-color))]">
          {{ name }}
        </a>

        <nav aria-label="Main menu">
          <ul class="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-[rgb(var(--body-text-color))] sm:gap-6">
            <li v-for="item in navigation" :key="item.href">
              <a class="transition hover:text-[rgb(var(--heading-text-color))]" :href="item.href">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <ThemeModeSwitch :active-mode="props.activeThemeMode" @update:active-mode="handleThemeModeUpdate" />
      </header>
    </BaseContainer>
  </div>
</template>
