import i18n from "i18next";
import { initReactI18next } from "react-i18next";

void i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  resources: {
    ru: { translation: {} },
    en: { translation: {} },
  },
  interpolation: { escapeValue: false },
});

export default i18n;

/**
 * Базовая инициализация i18next для Next.js
 */
