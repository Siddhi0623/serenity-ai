import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/common.json';

/**
 * i18next bootstrap.
 *
 * Phase 0: English only, but the resources/namespacing is set up so adding
 * hi / es / ja in Phase 5 is just dropping JSON files alongside `en`.
 */

export const SUPPORTED_LOCALES = ['en', 'hi', 'es', 'ja'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'serenity:locale',
    },
    returnNull: false,
  });

export default i18n;
