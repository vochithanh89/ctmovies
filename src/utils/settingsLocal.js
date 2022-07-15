export const getLanguage = () => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    return settings?.language;
};

export const setLanguageLocal = (language) => {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    settings.language = language;
    localStorage.setItem('settings', JSON.stringify(settings));
};

export const getTheme = () => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    return settings?.theme;
};

export const setThemeLocal = (theme) => {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    settings.theme = theme;
    localStorage.setItem('settings', JSON.stringify(settings));
};
