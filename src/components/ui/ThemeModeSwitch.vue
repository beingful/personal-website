<script setup lang="ts">
import type { ThemeMode } from '@/types/theme';

interface ThemeModeSwitchProps {
  readonly activeMode: ThemeMode;
}

interface ThemeModeSwitchEmits {
  (eventName: 'update:activeMode', value: ThemeMode): void;
}

const props = defineProps<ThemeModeSwitchProps>();
const emit = defineEmits<ThemeModeSwitchEmits>();

const themeModes: readonly ThemeMode[] = ['day', 'night'];

const handleModeSelection = (mode: ThemeMode): void => {
  emit('update:activeMode', mode);
};
</script>

<template>
  <div
    class="inline-flex items-center gap-1 rounded-full border border-[rgb(var(--theme-switcher-border-color)/0.5)] bg-[rgb(var(--theme-switcher-background-color)/0.8)] p-1"
    role="group"
    aria-label="Theme mode switcher"
  >
    <button
      v-for="mode in themeModes"
      :key="mode"
      type="button"
      class="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition"
      :class="
        props.activeMode === mode
          ? 'bg-[rgb(var(--theme-switcher-active-background-color))] text-[rgb(var(--theme-switcher-active-text-color))] shadow-soft'
          : 'text-[rgb(var(--theme-switcher-inactive-text-color))] hover:text-[rgb(var(--theme-switcher-inactive-hover-text-color))]'
      "
      @click="handleModeSelection(mode)"
    >
      {{ mode }}
    </button>
  </div>
</template>
