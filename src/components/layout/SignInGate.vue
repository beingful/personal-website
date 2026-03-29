<script setup lang="ts">
interface SignInGateProps {
  readonly message?: string;
  readonly isCheckingSession: boolean;
}

defineProps<SignInGateProps>();
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(var(--page-background-color)/0.78)] px-4 py-8 backdrop-blur-md">
    <div
      class="w-[min(100%,42rem)] rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.94)] p-[8%] shadow-soft"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
        Sign In Required
      </p>
      <h1 class="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.96] text-[rgb(var(--heading-text-color))]">
        Please sign in before accessing the website.
      </h1>
      <p class="mt-5 max-w-[34rem] text-base leading-7 text-[rgb(var(--body-text-color))] sm:text-lg">
        Use Google or Microsoft to continue. Each successful sign-in records your email and visit timestamp before access is granted.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="/auth/google/start"
          class="inline-flex items-center justify-center rounded-full bg-[rgb(var(--heading-text-color))] px-5 py-3 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))]"
        >
          Continue with Google
        </a>
        <a
          href="/auth/microsoft/start"
          class="inline-flex items-center justify-center rounded-full border border-[rgb(var(--card-border-color)/0.7)] bg-[rgb(var(--card-background-color)/0.78)] px-5 py-3 text-sm font-semibold text-[rgb(var(--heading-text-color))] transition hover:border-[rgb(var(--muted-text-color))] hover:bg-[rgb(var(--card-background-color)/0.95)]"
        >
          Continue with Microsoft
        </a>
      </div>

      <p v-if="message" class="mt-6 text-sm leading-6 text-[rgb(var(--body-text-strong-color))]">
        {{ message }}
      </p>
    </div>
  </div>
</template>
