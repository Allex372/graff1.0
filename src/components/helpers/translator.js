export const getLocalizedText = (language, loc, text) => {
    return language === 'en' ? loc : text;
};