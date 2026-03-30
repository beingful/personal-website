<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { RouterView } from 'vue-router';

import SignInGate from '@/components/layout/SignInGate.vue';

const isAuthenticated = ref(false);
const isCheckingSession = ref(true);
const authMessage = ref('');

const loadAuthenticationState = async (): Promise<void> => {
  isCheckingSession.value = true;

  try {
    const response = await fetch('/api/auth/session', {
      credentials: 'include'
    });
    const responseBody = (await response.json()) as { isAuthenticated?: boolean };

    isAuthenticated.value = response.ok && responseBody.isAuthenticated === true;
  } catch {
    isAuthenticated.value = false;
  } finally {
    isCheckingSession.value = false;
  }
};

onMounted(() => {
  const currentUrl = new URL(window.location.href);
  const authStatus = currentUrl.searchParams.get('auth');
  const authErrorMessage = currentUrl.searchParams.get('message');

  if (authStatus === 'sign-in-error') {
    authMessage.value = authErrorMessage?.trim() || 'Sign-in did not complete successfully.';
  }

  void loadAuthenticationState().finally(() => {
    if (authStatus) {
      currentUrl.searchParams.delete('auth');
      currentUrl.searchParams.delete('message');
      window.history.replaceState({}, '', currentUrl.toString());
    }
  });
});

watch(
  isAuthenticated,
  (value) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = value ? '' : 'hidden';
    }
  },
  { immediate: true }
);

const shouldShowGate = computed(() => !isAuthenticated.value);
const shouldRenderProtectedContent = computed(() => isAuthenticated.value);
</script>

<template>
  <div class="min-h-screen bg-grain font-body text-surface-900">
    <div v-if="shouldRenderProtectedContent">
      <RouterView />
    </div>
    <SignInGate
      v-if="shouldShowGate"
      :is-checking-session="isCheckingSession"
      :message="authMessage"
    />
    <div
      class="pointer-events-none fixed bottom-4 right-4 z-40 rounded-full border border-[rgb(var(--watermark-border-color)/0.35)] bg-[rgb(var(--watermark-background-color)/0.7)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--watermark-text-color))] backdrop-blur"
    >
      Implemented in cooperation with Codex
    </div>
  </div>
</template>
