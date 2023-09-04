import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const Context = createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        localStorage.setItem('language', JSON.stringify('ua'));
        const currentLanguage = localStorage.getItem('language');
        const i18Language = i18n.language ? i18n.language : currentLanguage;
        if (i18Language) {
            localStorage.setItem('language', JSON.stringify(i18Language));
        }
        setLanguage(i18Language);
    }, []);

    const changeLanguage = (language) => {
        setLanguage(language);
        i18n.changeLanguage(language);
    }

    const setEN = (language) => {
        changeLanguage(language);
        localStorage.setItem('language', JSON.stringify(language));
    };

    const setUA = (language) => {
        changeLanguage(language);
        localStorage.setItem('language', JSON.stringify(language));
    };

    const setRU = (language) => {
        changeLanguage(language);
        localStorage.setItem('language', JSON.stringify(language));
    };

    return <Context.Provider value={{ language, setEN, setUA, setRU, t }}>{children}</Context.Provider>;
}

export default LanguageProvider;

export const useLanguage = () => useContext(Context);