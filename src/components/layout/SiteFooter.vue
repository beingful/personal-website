<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
</script>

<template>
  <footer class="border-t border-[rgb(var(--card-border-color)/0.45)] pb-24 pt-8">
    <BaseContainer class="flex flex-col gap-4 text-sm text-[rgb(var(--body-text-color))] lg:flex-row lg:items-center lg:justify-between">
      <p>&copy; 2026 Hanna Kasai</p>
      <p>Built with Vue, TypeScript, and Tailwind.</p>
    </BaseContainer>
  </footer>
</template>
