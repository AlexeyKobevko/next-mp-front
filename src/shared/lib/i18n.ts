'use client';

import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

void i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',
        ns: ['common'],
        defaultNS: 'common',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: { escapeValue: false },
    });

export default i18n;

/**
 * Базовая инициализация i18next для Next.js с динамической загрузкой переводов
 * Переводы хранятся в public/locales/{{lng}}/{{ns}}.json
 */

