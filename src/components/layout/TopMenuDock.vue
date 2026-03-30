<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

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
const isSideDockExpanded = ref(false);
const isLaptopViewport = ref(false);

const mobileToggleLabel = computed(() =>
  isSideDockExpanded.value ? 'Collapse navigation dock' : 'Expand navigation dock'
);

const handleThemeModeUpdate = (mode: ThemeMode): void => {
  emit('update:activeThemeMode', mode);
};

const toggleSideDock = (): void => {
  isSideDockExpanded.value = !isSideDockExpanded.value;
};

const closeSideDock = (): void => {
  isSideDockExpanded.value = false;
};

onMounted(() => {
  if (typeof window === 'undefined') {
    return;
  }

  const laptopViewportMediaQuery = window.matchMedia('(min-width: 1024px)');
  const updateViewportMode = (): void => {
    isLaptopViewport.value = laptopViewportMediaQuery.matches;

    if (isLaptopViewport.value) {
      closeSideDock();
    }
  };

  updateViewportMode();
  laptopViewportMediaQuery.addEventListener('change', updateViewportMode);

  onBeforeUnmount(() => {
    laptopViewportMediaQuery.removeEventListener('change', updateViewportMode);
  });
});
</script>

<template>
  <div class="h-20 lg:hidden" aria-hidden="true" />

  <div class="sticky top-0 z-30 hidden px-4 pt-4 lg:block">
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

  <div class="fixed left-3 top-3 z-40 lg:hidden">
    <div
      class="flex items-start gap-3 rounded-[1.5rem] border border-[rgb(var(--dock-border-color)/0.14)] bg-[rgb(var(--dock-background-color)/0.12)] p-2 shadow-soft backdrop-blur"
    >
      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[rgb(var(--card-border-color)/0.25)] bg-[rgb(var(--card-background-color)/0.08)] text-[rgb(var(--heading-text-color))] transition hover:bg-[rgb(var(--card-background-color)/0.14)]"
        :aria-expanded="isSideDockExpanded"
        aria-controls="mobile-side-dock-navigation"
        :aria-label="mobileToggleLabel"
        @click="toggleSideDock"
      >
        <span class="text-xl leading-none">{{ isSideDockExpanded ? '×' : '≡' }}</span>
      </button>

      <aside
        v-show="isSideDockExpanded && !isLaptopViewport"
        id="mobile-side-dock-navigation"
        class="max-h-[calc(100vh-1.5rem)] w-[min(70vw,18rem)] overflow-y-auto rounded-[1.25rem] border border-[rgb(var(--dock-border-color)/0.16)] bg-[rgb(var(--dock-background-color)/0.18)] p-4"
      >
        <div class="flex items-center justify-between gap-4">
          <a
            href="/"
            class="font-display text-base font-semibold tracking-[0.04em] text-[rgb(var(--heading-text-color))]"
            @click="closeSideDock"
          >
            {{ name }}
          </a>
          <ThemeModeSwitch
            :active-mode="props.activeThemeMode"
            @update:active-mode="handleThemeModeUpdate"
          />
        </div>

        <nav class="mt-4" aria-label="Side menu">
          <ul class="space-y-2 text-sm font-medium text-[rgb(var(--body-text-color))]">
            <li v-for="item in navigation" :key="item.href">
              <a
                class="block rounded-[0.9rem] px-3 py-2 transition hover:bg-[rgb(var(--card-background-color)/0.78)] hover:text-[rgb(var(--heading-text-color))]"
                :href="item.href"
                @click="closeSideDock"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>
