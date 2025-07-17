'use client';

import { useThemeStore } from './theme';

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            className="border-dark-accent rounded border p-2"
            onClick={toggleTheme}
            type="button"
        >
            {theme === 'light' ? '🌞' : '🌚'}
        </button>
    );
}

/**
 * Компонент для переключения темы (светлая/темная)
 */
