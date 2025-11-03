'use client';

import { useTranslation } from 'react-i18next';
import cn from 'classnames';

export function ToggleLanguageButton() {
    const { i18n } = useTranslation();

    if (typeof i18n.changeLanguage !== 'function') {
        return null;
    }

    function handleChange(lang: string) {
        void i18n.changeLanguage(lang);
    }

    return (
        <div className="flex gap-2">
            <button
                className={cn(
                    'border-dark-accent text-light-shades rounded border p-2',
                    {
                        'font-bold underline': i18n.language === 'ru',
                    }
                )}
                onClick={() => handleChange('ru')}
                type="button"
            >
                RU
            </button>
            <button
                className={cn(
                    'border-dark-accent text-light-shades rounded border p-2',
                    {
                        'font-bold underline': i18n.language === 'en',
                    }
                )}
                onClick={() => handleChange('en')}
                type="button"
            >
                EN
            </button>
        </div>
    );
}

/**
 * Компонент для переключения языка (RU/EN)
 */

