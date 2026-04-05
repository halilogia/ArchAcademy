import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import trCommon from './locales/tr/common.json';
import enCommon from './locales/en/common.json';
import trNavigation from './locales/tr/navigation.json';
import enNavigation from './locales/en/navigation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        common: trCommon,
        navigation: trNavigation
      },
      en: {
        common: enCommon,
        navigation: enNavigation
      }
    },
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en'],
    debug: false, // Production için kapalı, geliştirme sırasında true yapılabilir
    interpolation: {
      escapeValue: false // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;