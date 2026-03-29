<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseLinkButton from '@/components/ui/BaseLinkButton.vue';
import type { ContactMethod } from '@/types/content';

interface ContactSectionProps {
  readonly methods: readonly ContactMethod[];
}

defineProps<ContactSectionProps>();
</script>

<template>
  <BaseContainer>
    <BaseSection
      id="contact"
      eyebrow="Contact"
      title="If the work needs depth, clarity, and follow-through, I’m interested."
      description="If you think there is a strong fit or have any questions left, please reach out through the channel that is most convenient for you."
    >
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div class="rounded-[2rem] bg-[rgb(var(--heading-text-color))] p-[8%] text-[rgb(var(--inverse-text-color))] shadow-soft">
          <p class="max-w-[28rem] text-[clamp(1.5rem,3vw,2.5rem)] font-display leading-tight">
            Interested in building a product, strengthening a backend platform, or shaping a clearer cloud architecture?
          </p>
          <p class="mt-5 max-w-[32rem] text-base leading-7 text-[rgb(var(--inverse-text-color)/0.8)]">
            I work best on projects where engineering quality, cloud reliability, and long-term maintainability matter from the start.
          </p>
          <div class="mt-8">
            <BaseLinkButton
              href="mailto:hello@hannakasai.com"
              label="Email Hanna"
              variant="secondary"
            />
          </div>
        </div>

        <div class="rounded-[2rem] border border-[rgb(var(--card-border-color)/0.45)] bg-[rgb(var(--card-background-color)/0.8)] p-[8%]">
          <ul class="grid gap-6">
            <li
              v-for="method in methods"
              :key="method.label"
              class="border-b border-[rgb(var(--card-border-color)/0.45)] pb-6 last:border-b-0 last:pb-0"
            >
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted-text-color))]">
                {{ method.label }}
              </p>
              <a
                :href="method.href"
                class="mt-2 inline-flex text-lg text-[rgb(var(--heading-text-color))] transition hover:text-[rgb(var(--accent-text-strong-color))]"
              >
                {{ method.value }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </BaseSection>
  </BaseContainer>
</template>
