import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const Context = createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setLanguage(i18n.language);
    }, []);

    const changeLanguage = (language) => {
        setLanguage(language);
        i18n.changeLanguage(language);
    }

    const setEN = (language) => {
        changeLanguage(language);
    };
    const setUA = (language) => {
        changeLanguage(language);
    };

    return <Context.Provider value={{ language, setEN, setUA, t }}>{children}</Context.Provider>;
}

export default LanguageProvider;

export const useLanguage = () => useContext(Context);