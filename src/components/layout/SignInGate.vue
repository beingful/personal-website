<script setup lang="ts">
import { computed, ref } from 'vue';

interface SignInGateProps {
  readonly message?: string;
  readonly isCheckingSession: boolean;
}

interface SignInGateEmits {
  (eventName: 'authenticated'): void;
}

const props = defineProps<SignInGateProps>();
const emit = defineEmits<SignInGateEmits>();
const isNameFlowVisible = ref(false);
const visitorName = ref('');
const visitorNameValidationMessage = ref('');
const isSubmittingName = ref(false);
const submissionMessage = ref('');

const shouldShowFeedbackMessage = computed(() => props.message || submissionMessage.value);

const showNameFlow = (): void => {
  isNameFlowVisible.value = true;
  submissionMessage.value = '';
};

const submitNameAccess = async (): Promise<void> => {
  const trimmedName = visitorName.value.trim();

  if (!trimmedName) {
    visitorNameValidationMessage.value = 'Name is required and cannot be empty.';
    return;
  }

  visitorNameValidationMessage.value = '';
  submissionMessage.value = '';
  isSubmittingName.value = true;

  try {
    const response = await fetch('/api/auth/name-access', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: trimmedName
      })
    });

    if (!response.ok) {
      const responseBody = (await response.json().catch(() => ({}))) as { message?: string };
      submissionMessage.value =
        responseBody.message || 'Unable to continue without sharing email.';
      return;
    }

    emit('authenticated');
  } catch {
    submissionMessage.value = 'Unable to continue without sharing email.';
  } finally {
    isSubmittingName.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(var(--page-background-color)/0.78)] px-3 py-4 backdrop-blur-md sm:px-4 sm:py-8">
    <div
      class="sign-in-gate-panel w-[min(100%,48rem)] rounded-[1.5rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.94)] px-[7%] py-[5%] shadow-soft sm:rounded-[2rem] sm:px-[8%] sm:py-[6%]"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
        Sign In Required
      </p>
      <h1 class="mt-2 font-display text-[clamp(1.6rem,8vw,3.75rem)] leading-[0.94] text-[rgb(var(--heading-text-color))] sm:mt-3">
        Please sign in before accessing the website.
      </h1>
      <p class="mt-3 max-w-[34rem] text-sm leading-6 text-[rgb(var(--body-text-color))] sm:mt-4 sm:text-base sm:leading-7 lg:text-lg">
        Use Google or Microsoft to continue. If you prefer not to share your email, you may continue by providing a name instead. The only information I request is a basic identifier for the visitor, preferably the name of your organization or, if you are visiting independently, your own name.
      </p>

      <div class="mt-4 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
        <a
          href="/auth/google/start"
          class="inline-flex w-fit items-center justify-start gap-2.5 rounded-full bg-[rgb(var(--heading-text-color))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))] sm:gap-3 sm:px-5 sm:py-3"
        >
          <img
            src="/media/icons/google-icon.png"
            alt=""
            aria-hidden="true"
            class="h-5 w-5 object-contain sm:h-6 sm:w-6"
          >
          Continue with Google
        </a>
        <a
          href="/auth/microsoft/start"
          class="inline-flex w-fit items-center justify-start gap-2.5 rounded-full bg-[rgb(var(--heading-text-color))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))] sm:gap-3 sm:px-5 sm:py-3"
        >
          <img
            src="/media/icons/microsoft-icon.png"
            alt=""
            aria-hidden="true"
            class="h-5 w-5 object-contain sm:h-6 sm:w-6"
          >
          Continue with Microsoft
        </a>
        <button
          type="button"
          class="inline-flex w-fit items-center justify-start gap-2.5 rounded-full bg-[rgb(var(--heading-text-color))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))] sm:gap-3 sm:px-5 sm:py-3"
          @click="showNameFlow"
        >
          <img
            src="/media/icons/anonymous-icon.png"
            alt=""
            aria-hidden="true"
            class="h-5 w-5 object-contain sm:h-6 sm:w-6"
          >
          Continue without sharing e-mail
        </button>
      </div>

      <form
        v-if="isNameFlowVisible"
        class="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3"
        @submit.prevent="submitNameAccess"
      >
        <label class="block space-y-2">
          <span class="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--muted-text-color))] sm:text-sm">
            Visitor name
          </span>
          <input
            v-model="visitorName"
            type="text"
            name="visitor-name"
            class="w-full rounded-[1rem] border border-[rgb(var(--card-border-color)/0.65)] bg-[rgb(var(--card-background-color)/0.72)] px-4 py-2.5 text-sm text-[rgb(var(--heading-text-color))] placeholder:text-[rgb(var(--muted-text-color))] sm:py-3 sm:text-base"
            placeholder="Your name or organization"
            :disabled="isSubmittingName"
          >
        </label>

        <p
          v-if="visitorNameValidationMessage"
          class="text-sm leading-6 text-[rgb(220_38_38)]"
        >
          {{ visitorNameValidationMessage }}
        </p>

        <button
          type="submit"
          class="inline-flex w-fit items-center justify-center rounded-full bg-[rgb(var(--heading-text-color))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))] disabled:cursor-not-allowed disabled:opacity-70 sm:px-5 sm:py-3"
          :disabled="isSubmittingName"
        >
          {{ isSubmittingName ? 'Submitting...' : 'Continue with name' }}
        </button>
      </form>

      <p
        v-if="shouldShowFeedbackMessage"
        class="mt-4 text-sm leading-5 text-[rgb(var(--body-text-strong-color))] sm:mt-5 sm:leading-6"
      >
        {{ submissionMessage || props.message }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@media (max-height: 720px) {
  .sign-in-gate-panel {
    padding: 1.25rem 1.5rem;
  }
}
</style>
