"use client";

import { useThemeStore } from "./theme";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      className="px-2 py-1 border rounded"
      onClick={toggleTheme}
      type="button"
    >
      {theme === "light" ? "🌞" : "🌚"}
    </button>
  );
}

/**
 * Компонент для переключения темы (светлая/темная)
 */
