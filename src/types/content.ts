export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface LinkItem {
  readonly label: string;
  readonly href: string;
  readonly download?: string;
  readonly target?: '_blank' | '_self';
  readonly rel?: string;
}

export interface StatItem {
  readonly label: string;
  readonly value: string;
}

export interface HighlightCard {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface CertificateItem {
  readonly title: string;
  readonly issuer: string;
  readonly documentPreviewHref: string;
  readonly href?: string;
}

export interface ExperienceItem {
  readonly period: string;
  readonly title: string;
  readonly company: string;
  readonly summary: string;
  readonly achievements: readonly string[];
}

export interface ProjectItem {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly href?: string;
  readonly repositoryHref?: string;
}

export interface ContactMethod {
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

export interface ProfileLinkItem {
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export interface LanguageItem {
  readonly name: string;
  readonly proficiency: string;
}

export interface EducationItem {
  readonly period: string;
  readonly degree: string;
  readonly institution: string;
  readonly details: string;
}

export interface ResumeDocument {
  readonly title: string;
  readonly summary: string;
  readonly previewHref: string;
  readonly actions: readonly LinkItem[];
}

export interface SiteContent {
  readonly name: string;
  readonly role: string;
  readonly intro: string;
  readonly location: string;
  readonly navigation: readonly NavigationItem[];
  readonly heroLinks: readonly LinkItem[];
  readonly heroStats: readonly StatItem[];
  readonly certificates: readonly CertificateItem[];
  readonly experience: readonly ExperienceItem[];
  readonly skillGroups: readonly SkillGroup[];
  readonly projects: readonly ProjectItem[];
  readonly education: readonly EducationItem[];
  readonly languages: readonly LanguageItem[];
  readonly resume: ResumeDocument;
  readonly profileLinks: readonly ProfileLinkItem[];
  readonly contactMethods: readonly ContactMethod[];
}
