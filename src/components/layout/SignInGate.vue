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
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(var(--page-background-color)/0.78)] px-4 py-8 backdrop-blur-md">
    <div
      class="w-[min(100%,48rem)] rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.94)] px-[8%] py-[6%] shadow-soft"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-text-color))]">
        Sign In Required
      </p>
      <h1 class="mt-3 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.96] text-[rgb(var(--heading-text-color))]">
        Please sign in before accessing the website.
      </h1>
      <p class="mt-4 max-w-[34rem] text-base leading-7 text-[rgb(var(--body-text-color))] sm:text-lg">
        Use Google or Microsoft to continue. If you prefer not to share your email, you may continue by providing a name instead. The only information I request is a basic identifier for the visitor, preferably the name of your organization or, if you are visiting independently, your own name.
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <a
          href="/auth/google/start"
          class="inline-flex w-fit items-center justify-start gap-3 rounded-full bg-[rgb(var(--heading-text-color))] px-5 py-3 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))]"
        >
          <img
            src="/media/icons/google-icon.png"
            alt=""
            aria-hidden="true"
            class="h-6 w-6 object-contain"
          >
          Continue with Google
        </a>
        <a
          href="/auth/microsoft/start"
          class="inline-flex w-fit items-center justify-start gap-3 rounded-full bg-[rgb(var(--heading-text-color))] px-5 py-3 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))]"
        >
          <img
            src="/media/icons/microsoft-icon.png"
            alt=""
            aria-hidden="true"
            class="h-6 w-6 object-contain"
          >
          Continue with Microsoft
        </a>
        <button
          type="button"
          class="inline-flex w-fit items-center justify-start gap-3 rounded-full bg-[rgb(var(--heading-text-color))] px-5 py-3 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))]"
          @click="showNameFlow"
        >
          <img
            src="/media/icons/anonymous-icon.png"
            alt=""
            aria-hidden="true"
            class="h-6 w-6 object-contain"
          >
          Continue without sharing e-mail
        </button>
      </div>

      <form
        v-if="isNameFlowVisible"
        class="mt-5 space-y-3"
        @submit.prevent="submitNameAccess"
      >
        <label class="block space-y-2">
          <span class="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--muted-text-color))]">
            Visitor name
          </span>
          <input
            v-model="visitorName"
            type="text"
            name="visitor-name"
            class="w-full rounded-[1rem] border border-[rgb(var(--card-border-color)/0.65)] bg-[rgb(var(--card-background-color)/0.72)] px-4 py-3 text-base text-[rgb(var(--heading-text-color))] placeholder:text-[rgb(var(--muted-text-color))]"
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
          class="inline-flex w-fit items-center justify-center rounded-full bg-[rgb(var(--heading-text-color))] px-5 py-3 text-sm font-semibold text-[rgb(var(--inverse-text-color))] transition hover:bg-[rgb(var(--body-text-strong-color))] disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isSubmittingName"
        >
          {{ isSubmittingName ? 'Submitting...' : 'Continue with name' }}
        </button>
      </form>

      <p
        v-if="shouldShowFeedbackMessage"
        class="mt-5 text-sm leading-6 text-[rgb(var(--body-text-strong-color))]"
      >
        {{ submissionMessage || props.message }}
      </p>
    </div>
  </div>
</template>
