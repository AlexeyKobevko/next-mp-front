import { create } from 'zustand';
import { useEffect } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') {
        return undefined;
    }

    const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
    );

    return match ? decodeURIComponent(match[2]) : undefined;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const isSecure =
        typeof window !== 'undefined' && window.location.protocol === 'https:';

    document.cookie = `${name}=${encodeURIComponent(
        value
    )}; expires=${expires}; path=/; SameSite=Lax${isSecure ? '; Secure' : ''}`;
};

const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }
    return 'light';
};

const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
        const stored = getCookie(THEME_KEY);

        if (stored === 'dark' || stored === 'light') {
            return stored;
        }

        return getSystemTheme();
    }

    return 'light';
};

interface ThemeState {
    theme: Theme;
    userSelected: boolean;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    theme: getInitialTheme(),
    userSelected: typeof window !== 'undefined' && !!getCookie(THEME_KEY),
    setTheme: (theme) => {
        set({ theme, userSelected: true });

        if (typeof window !== 'undefined') {
            setCookie(THEME_KEY, theme);
        }
    },
    toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light';

        set({ theme: next, userSelected: true });

        if (typeof window !== 'undefined') {
            setCookie(THEME_KEY, next);
        }
    },
}));

// Синхронизация между вкладками и поддержка системной темы
export const useThemeSync = () => {
    const { userSelected, setTheme } = useThemeStore();

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (
                e.key === THEME_KEY &&
                (e.newValue === 'dark' || e.newValue === 'light')
            ) {
                setTheme(e.newValue as Theme);
            }
        };

        window.addEventListener('storage', handleStorage);

        let mql: MediaQueryList | null = null;

        const handleSystemTheme = (e: MediaQueryListEvent) => {
            if (!userSelected) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        if (window.matchMedia) {
            mql = window.matchMedia('(prefers-color-scheme: dark)');
            mql.addEventListener('change', handleSystemTheme);
        }

        return () => {
            window.removeEventListener('storage', handleStorage);

            if (mql) {
                mql.removeEventListener('change', handleSystemTheme);
            }
        };
    }, [userSelected, setTheme]);
};

/**
 * Хук для получения текущей темы и функций управления
 * @returns { theme, setTheme, toggleTheme }
 *
 * useThemeSync() — для синхронизации между вкладками и поддержки системной темы
 */
