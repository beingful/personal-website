import { computed, onMounted, ref } from 'vue';

import type { ThemeMode } from '@/types/theme';

const THEME_STORAGE_KEY = 'hanna-kasai-theme-mode';
const DEFAULT_THEME_MODE: ThemeMode = 'night';

interface ThemeModeStorage {
  getThemeMode(): ThemeMode;
  setThemeMode(mode: ThemeMode): void;
}

class BrowserThemeModeStorage implements ThemeModeStorage {
  public getThemeMode(): ThemeMode {
    if (typeof window === 'undefined') {
      return DEFAULT_THEME_MODE;
    }

    const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);

    return storedThemeMode === 'day' || storedThemeMode === 'night'
      ? storedThemeMode
      : DEFAULT_THEME_MODE;
  }

  public setThemeMode(mode: ThemeMode): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }
}

const themeModeStorage: ThemeModeStorage = new BrowserThemeModeStorage();
const activeThemeMode = ref<ThemeMode>(DEFAULT_THEME_MODE);

const applyThemeMode = (mode: ThemeMode): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset.theme = mode;
};

export const useThemeMode = () => {
  const setThemeMode = (mode: ThemeMode): void => {
    activeThemeMode.value = mode;
    applyThemeMode(mode);
    themeModeStorage.setThemeMode(mode);
  };

  onMounted(() => {
    const storedThemeMode = themeModeStorage.getThemeMode();

    activeThemeMode.value = storedThemeMode;
    applyThemeMode(storedThemeMode);
  });

  return {
    activeThemeMode: computed(() => activeThemeMode.value),
    setThemeMode
  };
};
