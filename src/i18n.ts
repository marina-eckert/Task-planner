import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationRU from "./locales/ru/translation.json";
import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: translationRU },
      en: { translation: translationEN },
      de: { translation: translationDE },
    },
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
