import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: 'rgb(var(--surface-color-50) / <alpha-value>)',
          100: 'rgb(var(--surface-color-100) / <alpha-value>)',
          200: 'rgb(var(--surface-color-200) / <alpha-value>)',
          300: 'rgb(var(--surface-color-300) / <alpha-value>)',
          400: 'rgb(var(--surface-color-400) / <alpha-value>)',
          500: 'rgb(var(--surface-color-500) / <alpha-value>)',
          600: 'rgb(var(--surface-color-600) / <alpha-value>)',
          700: 'rgb(var(--surface-color-700) / <alpha-value>)',
          800: 'rgb(var(--surface-color-800) / <alpha-value>)',
          900: 'rgb(var(--surface-color-900) / <alpha-value>)'
        },
        accent: {
          50: 'rgb(var(--main-theme-secondary-color-50) / <alpha-value>)',
          100: 'rgb(var(--main-theme-secondary-color-100) / <alpha-value>)',
          200: 'rgb(var(--main-theme-secondary-color-200) / <alpha-value>)',
          300: 'rgb(var(--main-theme-secondary-color-300) / <alpha-value>)',
          400: 'rgb(var(--main-theme-secondary-color-400) / <alpha-value>)',
          500: 'rgb(var(--main-theme-secondary-color-500) / <alpha-value>)',
          600: 'rgb(var(--main-theme-secondary-color-600) / <alpha-value>)',
          700: 'rgb(var(--main-theme-secondary-color-700) / <alpha-value>)',
          800: 'rgb(var(--main-theme-secondary-color-800) / <alpha-value>)',
          900: 'rgb(var(--main-theme-secondary-color-900) / <alpha-value>)'
        }
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Instrument Sans"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 2rem 5rem -2rem rgb(var(--main-theme-shadow-color) / 0.35)'
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 20% 20%, rgb(var(--page-highlight-color) / 0.2) 0%, transparent 35%), radial-gradient(circle at 80% 0%, rgb(var(--page-accent-glow-color) / 0.15) 0%, transparent 30%), linear-gradient(135deg, rgb(var(--page-overlay-color) / 0.92), rgb(var(--page-overlay-secondary-color) / 0.92))'
      }
    }
  },
  plugins: [forms]
};

export default config;
