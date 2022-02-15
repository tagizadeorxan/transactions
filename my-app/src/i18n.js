import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from './i18n/en/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  }
};

i18n
.use(LanguageDetector)
.use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["translations"],
    defaultNS: "translations",

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources:{
      en: {
       
           translations: translationEN
        
      },
    }
  });




export default i18n;