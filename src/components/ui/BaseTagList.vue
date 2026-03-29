<script setup lang="ts">
interface BaseTagListProps {
  readonly items: readonly string[];
}

defineProps<BaseTagListProps>();
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li
      v-for="item in items"
      :key="item"
      class="rounded-full border border-[rgb(var(--card-border-color)/0.55)] bg-[rgb(var(--card-background-color)/0.8)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--body-text-color))]"
    >
      {{ item }}
    </li>
  </ul>
</template>
