'use client';

import { useTranslation } from 'react-i18next';

export function LangSwitcher() {
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
                className={i18n.language === 'ru' ? 'font-bold underline' : ''}
                onClick={() => handleChange('ru')}
                type="button"
            >
                RU
            </button>
            <button
                className={i18n.language === 'en' ? 'font-bold underline' : ''}
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
