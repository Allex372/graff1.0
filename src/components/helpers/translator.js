export const getLocalizedText = (language, textEN, textUA, textRU) => {
    if (language === 'en') {
        return textEN;
    } else if (language === 'ua') {
        return textUA;
    } else if (language === 'ru') {
        return textRU;
    } else {
        return '';
    }
};
