import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguadeDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from './src/components/locales/en/translationEN.json';
import translationUA from './src/components/locales/ua/translationUA.json';

const resources = {
    en: {
        translation: translationEN
    },
    ua: {
        translation: translationUA
    }
};

i18n.use(Backend).use(LanguadeDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'ua',
    debug: true,
    detection: {
        order: ['queryString', 'cookie'],
        caches: ['cookie']
    },
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;