'use client';

import '@/shared/lib/i18n';
import { useEffect, useRef } from 'react';
import { useThemeStore, useThemeSync, Theme } from '@/entities/theme';

interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: Theme;
}

/**
 * Провайдер темы для Tailwind и Zustand
 * Оборачивайте приложение для поддержки темной/светлой темы
 * initialTheme — тема, полученная с сервера (SSR)
 * Скрывает children до гидрации, чтобы не было мерцания
 */
export const ThemeProvider = ({
    children,
    initialTheme,
}: Readonly<ThemeProviderProps>) => {
    const initialized = useRef(false);
    const { theme, setTheme } = useThemeStore();

    useThemeSync();

    // Синхронизируем тему с сервером только один раз при монтировании
    useEffect(() => {
        if (!initialized.current) {
            // Inline script уже применил тему из cookie, проверяем актуальное состояние
            const currentHtmlTheme =
                document.documentElement.classList.contains('dark')
                    ? 'dark'
                    : 'light';

            // Проверяем cookie напрямую для уверенности
            // Используем ту же логику, что и в store
            const cookieTheme =
                typeof document !== 'undefined'
                    ? (() => {
                          const match = document.cookie.match(
                              new RegExp('(^| )theme=([^;]+)')
                          );
                          const value = match
                              ? decodeURIComponent(match[2])
                              : undefined;
                          return value === 'dark' || value === 'light'
                              ? value
                              : null;
                      })()
                    : null;

            // Определяем финальную тему: cookie > текущая HTML тема > initialTheme > store
            // Inline script уже применил тему из cookie, поэтому currentHtmlTheme должен быть правильным
            const finalTheme =
                cookieTheme === 'dark' || cookieTheme === 'light'
                    ? cookieTheme
                    : currentHtmlTheme === 'dark' ||
                        currentHtmlTheme === 'light'
                      ? currentHtmlTheme
                      : initialTheme || theme;

            // Синхронизируем store с финальной темой, если отличается
            if (finalTheme && finalTheme !== theme) {
                setTheme(finalTheme as Theme);
            }

            initialized.current = true;
        }

        // Применяем текущую тему к document (на случай, если она изменилась)
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [initialTheme, setTheme, theme]);

    // Применяем тему при изменении
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    // Не скрываем контент - тема уже применена на сервере через className в layout
    // и будет применена сразу при гидратации
    return <>{children}</>;
};
