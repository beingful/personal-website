<script setup lang="ts">
import SiteFooter from '@/components/layout/SiteFooter.vue';
import TopMenuDock from '@/components/layout/TopMenuDock.vue';
import CertificatesSection from '@/components/sections/CertificatesSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import EducationSection from '@/components/sections/EducationSection.vue';
import ExperienceSection from '@/components/sections/ExperienceSection.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import JobPreferencesSection from '@/components/sections/JobPreferencesSection.vue';
import LanguagesSection from '@/components/sections/LanguagesSection.vue';
import LinksSection from '@/components/sections/LinksSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import ResumeSection from '@/components/sections/ResumeSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import { useSiteContent } from '@/composables/useSiteContent';
import { useThemeMode } from '@/composables/useThemeMode';

const content = useSiteContent();
const { activeThemeMode, setThemeMode } = useThemeMode();
</script>

<template>
  <div>
    <TopMenuDock
      :name="content.name"
      :navigation="content.navigation"
      :active-theme-mode="activeThemeMode"
      @update:active-theme-mode="setThemeMode"
    />
    <main>
      <HeroSection
        :name="content.name"
        :role="content.role"
        :intro="content.intro"
        :location="content.location"
        :links="content.heroLinks"
        :stats="content.heroStats"
      />
      <ExperienceSection :items="content.experience" />
      <JobPreferencesSection :items="content.jobPreferences" />
      <SkillsSection :items="content.skillGroups" />
      <ProjectsSection :items="content.projects" />
      <EducationSection :items="content.education" />
      <LanguagesSection :items="content.languages" />
      <CertificatesSection :items="content.certificates" />
      <ResumeSection :resume="content.resume" />
      <LinksSection :items="content.profileLinks" />
      <ContactSection :methods="content.contactMethods" />
    </main>
    <SiteFooter />
  </div>
</template>
