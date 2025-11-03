'use client';

import { Switch } from '@headlessui/react';
import cn from 'classnames';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from './theme';

/**
 * Компонент для переключения темы (светлая/темная) на основе Headless UI Switch
 * Переключатель включен при тёмной теме, выключен при светлой
 * С эффектом стекла (glass morphism)
 */
export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <Switch
            checked={isDark}
            onChange={toggleTheme}
            className={cn(
                // Базовые стили для эффекта стекла
                'relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full',
                'bg-white/20 backdrop-blur-md dark:bg-white/10',
                'border border-white/30 dark:border-white/20',
                'shadow-lg transition-all duration-300',
                'focus:outline-none'
            )}
        >
            {({ checked }) => (
                <>
                    {/* Иконка солнца (слева) */}
                    <SunIcon
                        className={cn(
                            'absolute left-1.5 h-5 w-5 transition-colors duration-300',
                            checked ? 'text-gray-400' : 'text-yellow-500'
                        )}
                    />
                    {/* Иконка луны (справа) */}
                    <MoonIcon
                        className={cn(
                            'absolute right-1.5 h-5 w-5 transition-colors duration-300',
                            checked ? 'text-blue-300' : 'text-gray-400'
                        )}
                    />
                    {/* Ползунок с эффектом стекла */}
                    <span
                        className={cn(
                            'inline-block h-6 w-6 transform rounded-full transition-all duration-300',
                            'bg-white/40 backdrop-blur-md dark:bg-white/30',
                            'border border-white/50 shadow-md',
                            checked ? 'translate-x-8.5' : 'translate-x-1'
                        )}
                    />
                </>
            )}
        </Switch>
    );
};
