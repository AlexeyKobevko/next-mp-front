'use client';

import '../shared/i18n';
import { useEffect, useRef, useState } from 'react';
import { useThemeStore, useThemeSync, Theme } from './theme';

interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
    const initialized = useRef(false);
    const { theme, setTheme } = useThemeStore();

    useThemeSync();

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (initialTheme && !initialized.current) {
            setTheme(initialTheme);
            initialized.current = true;
        }
        setIsHydrated(true);
    }, [initialTheme, setTheme]);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    if (!isHydrated) return null;

    return children;
}

/**
 * Провайдер темы для Tailwind и Zustand
 * Оборачивайте приложение для поддержки темной/светлой темы
 * initialTheme — тема, полученная с сервера (SSR)
 * Скрывает children до гидрации, чтобы не было мерцания
 */
